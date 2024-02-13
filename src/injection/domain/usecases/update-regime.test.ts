import { test } from '@japa/runner';
import { inMemoryRulesRepository } from '../../infra/repositories/in-memory-rules.js';
import { UpdateRegimeOperation, updateRegimeUseCase } from './update-regime.js';

test.group('update-regime', async () => {
  test('add rule with success', async ({ assert }) => {
    const regime = 'D';
    const rule = 4;
    const updateRegime = updateRegimeUseCase(inMemoryRulesRepository());

    const success = await updateRegime(regime, rule, UpdateRegimeOperation.Add);

    assert.equal(success, true);
  });

  test('delete rule with success', async ({ assert }) => {
    const regime = 'D';
    const rule = 5;
    const updateRegime = updateRegimeUseCase(inMemoryRulesRepository());

    const success = await updateRegime(
      regime,
      rule,
      UpdateRegimeOperation.Delete
    );

    assert.equal(success, true);
  });
});
