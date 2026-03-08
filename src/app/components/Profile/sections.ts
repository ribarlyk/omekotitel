export enum ProfileSection {
  Details = "details",
  Password = "password",
  DeliveryAddress = "delivery",
  InvoiceAddress = "invoice",
  Orders = "orders",
  Payments = "payments",
  Wishlist = "wishlist",
  GDPR = "gdpr",
}

export const SECTION_LABELS: Record<ProfileSection, string> = {
  [ProfileSection.Details]: "Детайли",
  [ProfileSection.Password]: "Промяна на парола",
  [ProfileSection.DeliveryAddress]: "Адреси за доставка",
  [ProfileSection.InvoiceAddress]: "Адреси за фактура",
  [ProfileSection.Orders]: "Поръчки",
  [ProfileSection.Payments]: "Плащания",
  [ProfileSection.Wishlist]: "Любими стоки",
  [ProfileSection.GDPR]: "GDPR",
};
