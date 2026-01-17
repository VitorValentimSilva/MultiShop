/**
 * Plan Feature Entity
 *
 * Represents a feature included in a plan.
 */
export class PlanFeature {
  readonly planId: string;
  readonly featureId: string;
  readonly included: boolean;
  readonly note: string | null;
  readonly limitValue: number | null;
  readonly limitUnit: string | null;

  constructor(props: {
    planId: string;
    featureId: string;
    included?: boolean;
    note?: string | null;
    limitValue?: number | null;
    limitUnit?: string | null;
  }) {
    this.planId = props.planId;
    this.featureId = props.featureId;
    this.included = props.included ?? true;
    this.note = props.note ?? null;
    this.limitValue = props.limitValue ?? null;
    this.limitUnit = props.limitUnit ?? null;
  }

  /**
   * Check if feature has a limit
   */
  get hasLimit(): boolean {
    return this.limitValue !== null;
  }

  /**
   * Get formatted limit display
   */
  getFormattedLimit(): string | null {
    if (!this.hasLimit) return null;
    if (this.limitUnit) {
      return `${this.limitValue} ${this.limitUnit}`;
    }
    return `${this.limitValue}`;
  }
}
