import { Component, Input, NgModule } from '@angular/core';
import { isMockOf, MockBuilder, MockedComponentFixture, MockRender, ngMocks } from 'ng-mocks';

@Component({
  selector: 'target',
  template: `{{ target }}`,
})
class TargetComponent {
  @Input() public readonly target: string;
}

@Component({
  selector: 'missed',
  template: `missed`,
})
class MissedComponent {}

@Component({
  selector: 'test',
  template: `<target target="1"></target><target target="2"></target>`,
})
class TestComponent {}

@NgModule({
  declarations: [TargetComponent, MissedComponent, TestComponent],
})
class TargetModule {}

describe('ng-mocks-search-with-no-fixture:no-fixture', () => {
  it('.find type', () => {
    expect(() => ngMocks.find(TargetComponent)).toThrowError(
      /Cannot find an element via ngMocks.find\(TargetComponent\)/
    );
    expect(ngMocks.find(TargetComponent, undefined)).toBeUndefined();
  });

  it('.find css selector', () => {
    expect(() => ngMocks.find('target')).toThrowError(/Cannot find an element via ngMocks.find\(target\)/);
    expect(ngMocks.find('target', undefined)).toBeUndefined();
  });

  it('.findAll type', () => {
    const elements = ngMocks.findAll(TargetComponent);
    expect(elements.length).toEqual(0);
  });

  it('.findAll css selector', () => {
    const elements = ngMocks.findAll('target');
    expect(elements.length).toEqual(0);
  });

  it('.findInstance', () => {
    expect(() => ngMocks.findInstance(TargetComponent)).toThrowError(
      /Cannot find an instance via ngMocks.findInstance\(TargetComponent\)/
    );
    expect(ngMocks.findInstance(TargetComponent, undefined)).toBeUndefined();
  });

  it('.findInstances', () => {
    const componentInstances = ngMocks.findInstances(TargetComponent);
    expect(componentInstances.length).toEqual(0);
  });
});

describe('ng-mocks-search-with-no-fixture:fixture', () => {
  ngMocks.faster();

  let fixture: MockedComponentFixture<TestComponent>;
  beforeEach(() => MockBuilder(TestComponent, TargetModule));
  beforeEach(() => (fixture = MockRender(TestComponent)));

  describe('empty', () => {
    it('.find type', () => {
      const element = ngMocks.find(TargetComponent);
      expect(isMockOf(element.componentInstance, TargetComponent)).toBeTruthy();
      expect(element.componentInstance.target).toEqual('1');

      expect(ngMocks.find(MissedComponent, undefined)).toBeUndefined();
      expect(() => ngMocks.find(MissedComponent)).toThrowError(
        /Cannot find an element via ngMocks.find\(MissedComponent\)/
      );
    });

    it('.find css selector', () => {
      const element = ngMocks.find<TargetComponent>('target');
      expect(isMockOf(element.componentInstance, TargetComponent)).toBeTruthy();
      expect(element.componentInstance.target).toEqual('1');

      expect(ngMocks.find<MissedComponent>('missed', undefined)).toBeUndefined();
      expect(() => ngMocks.find<MissedComponent>('missed')).toThrowError(
        /Cannot find an element via ngMocks.find\(missed\)/
      );
    });

    it('.findAll type', () => {
      const elements = ngMocks.findAll(TargetComponent);
      expect(isMockOf(elements[0].componentInstance, TargetComponent)).toBeTruthy();
      expect(elements[0].componentInstance.target).toEqual('1');
      expect(isMockOf(elements[1].componentInstance, TargetComponent)).toBeTruthy();
      expect(elements[1].componentInstance.target).toEqual('2');
    });

    it('.findAll css selector', () => {
      const elements = ngMocks.findAll<TargetComponent>('target');
      expect(isMockOf(elements[0].componentInstance, TargetComponent)).toBeTruthy();
      expect(elements[0].componentInstance.target).toEqual('1');
      expect(isMockOf(elements[1].componentInstance, TargetComponent)).toBeTruthy();
      expect(elements[1].componentInstance.target).toEqual('2');
    });

    it('.findInstance', () => {
      const componentInstance = ngMocks.findInstance(TargetComponent);
      expect(isMockOf(componentInstance, TargetComponent)).toBeTruthy();
      expect(componentInstance.target).toEqual('1');

      expect(ngMocks.findInstance(MissedComponent, undefined)).toBeUndefined();
      expect(() => ngMocks.findInstance(MissedComponent)).toThrowError(
        /Cannot find an instance via ngMocks.findInstance\(MissedComponent\)/
      );
    });

    it('.findInstances', () => {
      const componentInstances = ngMocks.findInstances(TargetComponent);
      expect(isMockOf(componentInstances[0], TargetComponent)).toBeTruthy();
      expect(componentInstances[0].target).toEqual('1');
      expect(isMockOf(componentInstances[1], TargetComponent)).toBeTruthy();
      expect(componentInstances[1].target).toEqual('2');
    });
  });

  describe('fixture', () => {
    it('.find type', () => {
      const element = ngMocks.find(fixture, TargetComponent);
      expect(isMockOf(element.componentInstance, TargetComponent)).toBeTruthy();
      expect(element.componentInstance.target).toEqual('1');

      expect(ngMocks.find(fixture, MissedComponent, undefined)).toBeUndefined();
      expect(() => ngMocks.find(fixture, MissedComponent)).toThrowError(
        /Cannot find an element via ngMocks.find\(MissedComponent\)/
      );
    });

    it('.find css selector', () => {
      const element = ngMocks.find<TargetComponent>(fixture, 'target');
      expect(isMockOf(element.componentInstance, TargetComponent)).toBeTruthy();
      expect(element.componentInstance.target).toEqual('1');

      expect(ngMocks.find<MissedComponent>(fixture, 'missed', undefined)).toBeUndefined();
      expect(() => ngMocks.find<MissedComponent>(fixture, 'missed')).toThrowError(
        /Cannot find an element via ngMocks.find\(missed\)/
      );
    });

    it('.findAll type', () => {
      const elements = ngMocks.findAll(fixture, TargetComponent);
      expect(isMockOf(elements[0].componentInstance, TargetComponent)).toBeTruthy();
      expect(elements[0].componentInstance.target).toEqual('1');
      expect(isMockOf(elements[1].componentInstance, TargetComponent)).toBeTruthy();
      expect(elements[1].componentInstance.target).toEqual('2');
    });

    it('.findAll css selector', () => {
      const elements = ngMocks.findAll<TargetComponent>(fixture, 'target');
      expect(isMockOf(elements[0].componentInstance, TargetComponent)).toBeTruthy();
      expect(elements[0].componentInstance.target).toEqual('1');
      expect(isMockOf(elements[1].componentInstance, TargetComponent)).toBeTruthy();
      expect(elements[1].componentInstance.target).toEqual('2');
    });

    it('.findInstance', () => {
      const componentInstance = ngMocks.findInstance(fixture, TargetComponent);
      expect(isMockOf(componentInstance, TargetComponent)).toBeTruthy();
      expect(componentInstance.target).toEqual('1');

      expect(ngMocks.findInstance(fixture, MissedComponent, undefined)).toBeUndefined();
      expect(() => ngMocks.findInstance(fixture, MissedComponent)).toThrowError(
        /Cannot find an instance via ngMocks.findInstance\(MissedComponent\)/
      );
    });

    it('.findInstances', () => {
      const componentInstances = ngMocks.findInstances(fixture, TargetComponent);
      expect(isMockOf(componentInstances[0], TargetComponent)).toBeTruthy();
      expect(componentInstances[0].target).toEqual('1');
      expect(isMockOf(componentInstances[1], TargetComponent)).toBeTruthy();
      expect(componentInstances[1].target).toEqual('2');
    });
  });

  describe('debugElement', () => {
    it('.find type', () => {
      const element = ngMocks.find(fixture.debugElement, TargetComponent);
      expect(isMockOf(element.componentInstance, TargetComponent)).toBeTruthy();
      expect(element.componentInstance.target).toEqual('1');

      expect(ngMocks.find(fixture.debugElement, MissedComponent, undefined)).toBeUndefined();
      expect(() => ngMocks.find(fixture.debugElement, MissedComponent)).toThrowError(
        /Cannot find an element via ngMocks.find\(MissedComponent\)/
      );
    });

    it('.find css selector', () => {
      const element = ngMocks.find<TargetComponent>(fixture.debugElement, 'target');
      expect(isMockOf(element.componentInstance, TargetComponent)).toBeTruthy();
      expect(element.componentInstance.target).toEqual('1');

      expect(ngMocks.find<MissedComponent>(fixture.debugElement, 'missed', undefined)).toBeUndefined();
      expect(() => ngMocks.find<MissedComponent>(fixture.debugElement, 'missed')).toThrowError(
        /Cannot find an element via ngMocks.find\(missed\)/
      );
    });

    it('.findAll type', () => {
      const elements = ngMocks.findAll(fixture.debugElement, TargetComponent);
      expect(isMockOf(elements[0].componentInstance, TargetComponent)).toBeTruthy();
      expect(elements[0].componentInstance.target).toEqual('1');
      expect(isMockOf(elements[1].componentInstance, TargetComponent)).toBeTruthy();
      expect(elements[1].componentInstance.target).toEqual('2');
    });

    it('.findAll css selector', () => {
      const elements = ngMocks.findAll<TargetComponent>(fixture.debugElement, 'target');
      expect(isMockOf(elements[0].componentInstance, TargetComponent)).toBeTruthy();
      expect(elements[0].componentInstance.target).toEqual('1');
      expect(isMockOf(elements[1].componentInstance, TargetComponent)).toBeTruthy();
      expect(elements[1].componentInstance.target).toEqual('2');
    });

    it('.findInstance', () => {
      const componentInstance = ngMocks.findInstance(fixture.debugElement, TargetComponent);
      expect(isMockOf(componentInstance, TargetComponent)).toBeTruthy();
      expect(componentInstance.target).toEqual('1');

      expect(ngMocks.findInstance(fixture.debugElement, MissedComponent, undefined)).toBeUndefined();
      expect(() => ngMocks.findInstance(fixture.debugElement, MissedComponent)).toThrowError(
        /Cannot find an instance via ngMocks.findInstance\(MissedComponent\)/
      );
    });

    it('.findInstances', () => {
      const componentInstances = ngMocks.findInstances(fixture.debugElement, TargetComponent);
      expect(isMockOf(componentInstances[0], TargetComponent)).toBeTruthy();
      expect(componentInstances[0].target).toEqual('1');
      expect(isMockOf(componentInstances[1], TargetComponent)).toBeTruthy();
      expect(componentInstances[1].target).toEqual('2');
    });
  });
});
