const DefaultBookingFields = [
  {
    id: "first_name",
    label: "Voornaam",
    type: "text",
    options: ["text"],
    required: true,
    placeholder: ""
  },
  {
    id: "preposition",
    label: "Tussenvoegsel",
    type: "text",
    options: ["text"],
    required: false,
    placeholder: ""
  },
  {
    id: "last_name",
    label: "Achternaam",
    type: "text",
    options: ["text"],
    required: true,
    mandatory: true,
    placeholder: ""
  },
  {
    id: "address",
    label: "Adres",
    type: "text",
    options: ["text"],
    required: false,
    placeholder: ""
  },
  {
    id: "zipcode",
    label: "Postcode",
    type: "text",
    options: ["text"],
    required: false,
    placeholder: ""
  },
  {
    id: "city",
    label: "Plaats",
    type: "text",
    options: ["text"],
    required: true,
    placeholder: ""
  },
  {
    id: "country",
    label: "Land",
    type: "select",
    options: ["select"],
    required: true,
    mandatory: true,
    placeholder: ""
  },
  {
    id: "email",
    label: "E-mail",
    type: "email",
    options: ["email"],
    required: true,
    mandatory: true,
    placeholder: ""
  },
  {
    id: "mobile",
    label: "Mobiel telefoonnummer",
    type: "text",
    options: ["text"],
    required: false,
    placeholder: ""
  },
  {
    id: "telephone",
    label: "Telefoonnummer",
    type: "text",
    options: ["text"],
    required: true,
    placeholder: ""
  },
  {
    id: "comment",
    label: "Opmerking",
    type: "textarea",
    options: ["textarea"],
    required: false,
    rows: 10
  }
];

export default DefaultBookingFields;
