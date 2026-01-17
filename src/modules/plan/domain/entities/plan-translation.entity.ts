/**
 * Plan Translation Entity
 *
 * Represents localized content for a plan.
 */
export class PlanTranslation {
  readonly id: string;
  readonly planId: string;
  readonly locale: string;
  readonly title: string;
  readonly subtitle: string | null;
  readonly description: string | null;

  constructor(props: {
    id: string;
    planId: string;
    locale: string;
    title: string;
    subtitle?: string | null;
    description?: string | null;
  }) {
    this.id = props.id;
    this.planId = props.planId;
    this.locale = props.locale;
    this.title = props.title;
    this.subtitle = props.subtitle ?? null;
    this.description = props.description ?? null;
  }

  /**
   * Check if translation has a subtitle
   */
  get hasSubtitle(): boolean {
    return this.subtitle !== null && this.subtitle.length > 0;
  }

  /**
   * Check if translation has a description
   */
  get hasDescription(): boolean {
    return this.description !== null && this.description.length > 0;
  }
}
