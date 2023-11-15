import { mapEntries, mapValues } from '../../common/core.helpers';
import { funcExtractDeps } from '../../common/func.extract-deps';
import ngMocksUniverse from '../../common/ng-mocks-universe';

import initExcludeDef from './init-exclude-def';
import initKeepDef from './init-keep-def';
import initMockDeclarations from './init-mock-declarations';
import initModules from './init-modules';
import initReplaceDef from './init-replace-def';
import { BuilderData } from './types';

export default ({
  configDef,
  defProviders,
  defValue,
  excludeDef,
  keepDef,
  mockDef,
  replaceDef,
}: BuilderData): Map<any, any> => {
  ngMocksUniverse.flags.add('cachePipe');

  // collecting multi flags of providers.
  ngMocksUniverse.config.set('ngMocksMulti', new Set());
  // collecting all deps of providers.
  ngMocksUniverse.config.set('ngMocksDeps', new Set());
  // collecting all declarations of kept modules.
  ngMocksUniverse.config.set('ngMocksDepsSkip', new Set());
  // flags to understand how to mock nested declarations.
  ngMocksUniverse.config.set('ngMocksDepsResolution', new Map());

  const dependencies = initKeepDef(keepDef, configDef);
  for (const dependency of mapValues(dependencies)) {
    ngMocksUniverse.touches.add(dependency);
  }
  for (const dependency of mapValues(keepDef)) {
    dependencies.add(dependency);
    funcExtractDeps(dependency, dependencies, true);
  }
  for (const dependency of mapValues(mockDef)) {
    dependencies.add(dependency);
    funcExtractDeps(dependency, dependencies, true);
  }
  for (const dependency of mapValues(replaceDef)) {
    dependencies.add(dependency);
    funcExtractDeps(dependency, dependencies, true);
  }
  for (const dependency of mapValues(dependencies)) {
    if (configDef.has(dependency)) {
      continue;
    }

    // Checking global configuration for the dependency.
    const resolution = ngMocksUniverse.getResolution(dependency);
    if (resolution === 'replace') {
      replaceDef.add(dependency);
      defValue.set(dependency, ngMocksUniverse.getBuildDeclaration(dependency));
    } else if (resolution === 'keep') {
      keepDef.add(dependency);
    } else if (resolution === 'exclude') {
      excludeDef.add(dependency);
    } else if (resolution === 'mock') {
      mockDef.add(dependency);
    } else if (ngMocksUniverse.touches.has(dependency)) {
      mockDef.add(dependency);
    }

    configDef.set(
      dependency,
      ngMocksUniverse.touches.has(dependency)
        ? {
            dependency: true,
            __internal: true,
          }
        : {},
    );
  }

  for (const [k, v] of mapEntries(configDef)) {
    ngMocksUniverse.config.set(k, {
      ...ngMocksUniverse.getConfigMock().get(k),
      ...v,
      defValue: defValue.get(k),
    });
  }

  initReplaceDef(replaceDef, defValue);
  initExcludeDef(excludeDef);
  initMockDeclarations(mockDef, defValue);

  return initModules(keepDef, mockDef, replaceDef, defProviders);
};
