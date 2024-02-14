import type { UpdateRegime } from '../ports/primary/update-regime.js';
import type { RulesRepository } from '../ports/secondary/rules-repository.js';

export enum UpdateRegimeOperation {
  Add = 'add',
  Delete = 'delete',
}

export enum Regime {
  A = 'A',
  B = 'B',
  C = 'C',
  D = 'D'
}

// No reason to not move that out of updateRegimeUseCase as it does not have any dependencies from its parent
const isAdded = (rulesIds: number[], rule: number) => rulesIds.includes(rule);

const isDeleted = (rulesIds: number[], rule: number) =>
  !rulesIds.find((r) => r === rule);

export const updateRegimeUseCase = (
  rulesRepository: RulesRepository
): UpdateRegime => {
  return async (
    regime: string,
    rule: number,
    operation: UpdateRegimeOperation
  ) => {
    const rulesIds = await rulesRepository.updateRegime(
      regime,
      rule,
      operation
    );

    const operationToPerform = new Map<UpdateRegimeOperation, CallableFunction>([
      [UpdateRegimeOperation.Add, () => isAdded(rulesIds, rule)],
      [UpdateRegimeOperation.Delete, () => isDeleted(rulesIds, rule)]
    ])

    if(operationToPerform.has(operation)) {
       // use of ! because the type narrowing is somehow not working, but we know that if
       // we are entering this condition, the key/value pair must exist
       return operationToPerform.get(operation)!();
    }

    return false;
  };
};
