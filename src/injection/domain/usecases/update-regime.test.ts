import { test } from '@japa/runner';
import { inMemoryRulesRepository } from '../../infra/repositories/in-memory-rules.js';
import {Regime, UpdateRegimeOperation, updateRegimeUseCase} from './update-regime.js';
import {RuleIdentifier} from "./rules/rules.js";

test.group('update-regime', async () => {
  test('add rule with success', async ({ assert }) => {
    const regime = Regime.D;
    const rule = RuleIdentifier.FOUR;
    const updateRegime = updateRegimeUseCase(inMemoryRulesRepository());

    const success = await updateRegime(regime, rule, UpdateRegimeOperation.Add);

    assert.equal(success, true);
  });

  test('delete rule with success', async ({ assert }) => {
    const regime = Regime.D;
    const rule = RuleIdentifier.FIVE;
    const updateRegime = updateRegimeUseCase(inMemoryRulesRepository());

    const success = await updateRegime(
      regime,
      rule,
      UpdateRegimeOperation.Delete
    );

    assert.equal(success, true);
  });
});
