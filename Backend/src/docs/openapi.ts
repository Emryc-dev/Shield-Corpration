const secured = [{ bearerAuth: [] }];
export const openapi = {
  openapi: "3.1.0",
  info: { title: "The Shield Corporation Store API", version: "1.0.0", description: "API REST du catalogue, des clients, commandes et paiements." },
  servers: [{ url: "/api" }],
  tags: ["Auth", "Products", "Categories", "Favorites", "Cart", "Orders", "Payments", "Admin"].map(name => ({ name })),
  components: { securitySchemes: { bearerAuth: { type: "http", scheme: "bearer", bearerFormat: "JWT" } }, schemas: {
    Error: { type: "object", properties: { success: { type: "boolean", const: false }, error: { type: "object", properties: { code: { type: "string" }, message: { type: "string" } } } } },
    Product: { type: "object", properties: { id: { type: "string" }, name: { type: "string" }, slug: { type: "string" }, price: { type: "string" }, stock: { type: "integer" } } }
  } },
  paths: {
    "/health": { get: { summary: "État de l’API", responses: { "200": { description: "Disponible" } } } },
    "/auth/register": { post: { tags: ["Auth"], summary: "Créer un compte", responses: { "201": { description: "Créé" } } } },
    "/auth/login": { post: { tags: ["Auth"], summary: "Se connecter", responses: { "200": { description: "Connecté" }, "401": { description: "Refusé" } } } },
    "/auth/refresh": { post: { tags: ["Auth"], summary: "Renouveler la session", responses: { "200": { description: "Renouvelée" } } } },
    "/products": { get: { tags: ["Products"], summary: "Rechercher et filtrer", responses: { "200": { description: "Liste paginée" } } } },
    "/products/{slug}": { get: { tags: ["Products"], summary: "Détail produit", parameters: [{ name: "slug", in: "path", required: true, schema: { type: "string" } }], responses: { "200": { description: "Produit" } } } },
    "/categories": { get: { tags: ["Categories"], summary: "Catégories", responses: { "200": { description: "Catégories" } } } },
    "/favorites": { get: { tags: ["Favorites"], security: secured, summary: "Favoris", responses: { "200": { description: "Favoris" } } } },
    "/cart": { get: { tags: ["Cart"], security: secured, summary: "Panier", responses: { "200": { description: "Panier" } } }, delete: { tags: ["Cart"], security: secured, summary: "Vider", responses: { "200": { description: "Vidé" } } } },
    "/cart/items": { post: { tags: ["Cart"], security: secured, summary: "Ajouter au panier", responses: { "201": { description: "Ajouté" } } } },
    "/orders": { get: { tags: ["Orders"], security: secured, summary: "Historique", responses: { "200": { description: "Commandes" } } }, post: { tags: ["Orders"], security: secured, summary: "Commander", responses: { "201": { description: "Créée" } } } },
    "/payments": { post: { tags: ["Payments"], security: secured, summary: "Initialiser NotchPay", responses: { "201": { description: "Initialisé" } } } },
    "/payments/webhook/notchpay": { post: { tags: ["Payments"], summary: "Webhook signé", responses: { "200": { description: "Traité" } } } },
    "/admin/dashboard": { get: { tags: ["Admin"], security: secured, summary: "Indicateurs", responses: { "200": { description: "Indicateurs" } } } },
    "/admin/products": { get: { tags: ["Admin"], security: secured, summary: "Catalogue admin", responses: { "200": { description: "Produits" } } }, post: { tags: ["Admin"], security: secured, summary: "Créer un produit", responses: { "201": { description: "Créé" } } } },
    "/admin/orders": { get: { tags: ["Admin"], security: secured, summary: "Commandes admin", responses: { "200": { description: "Commandes" } } } },
    "/admin/users": { get: { tags: ["Admin"], security: secured, summary: "Clients", responses: { "200": { description: "Clients" } } } }
  }
} as const;
