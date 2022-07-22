import { ProductionNames } from './productionnames';

describe('Productionnames', () => {
  it('should create an instance', () => {
    expect(new ProductionNames(1, 'Walt Disney', 'PXR2021')).toBeTruthy();
  });
});
