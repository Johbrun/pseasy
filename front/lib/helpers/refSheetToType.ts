export function refSheetToType(reference: string) {
  switch (reference.substring(0, 2)) {
    case "AC":
      return "Apport de connaissances";
    case "PR":
      return "Procédures";
    case "FT":
      return "Techniques";
    default:
      return "Non renseigné";
  }
}
