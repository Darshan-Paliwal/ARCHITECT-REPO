/**
 * Database Seeder
 * Run: npm run seed
 * Creates default admin, settings, and sample data
 */

require("dotenv").config();
const mongoose = require("mongoose");
const Admin = require("../models/Admin");
const Settings = require("../models/Settings");
const Service = require("../models/Service");
const Project = require("../models/Project");
const Testimonial = require("../models/Testimonial");
const Team = require("../models/Team");

const connectDB = async () => {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log("✅ Connected to MongoDB");
};

const seed = async () => {
  await connectDB();

  // Clear existing data (comment out in production)
  await Promise.all([
    Admin.deleteMany(),
    Settings.deleteMany(),
    Service.deleteMany(),
    Project.deleteMany(),
    Testimonial.deleteMany(),
    Team.deleteMany(),
  ]);

  // ─── Admin ────────────────────────────────────────────────────
  await Admin.create({
    name: "Admin",
    email: "admin@arcstudio.com",
    password: "Admin@123456",
    role: "superadmin",
  });
  console.log("✅ Admin created: admin@arcstudio.com / Admin@123456");

  // ─── Settings ─────────────────────────────────────────────────
  await Settings.create({
    key: "main",
    branding: {
      firmName: "ArcStudio",
      tagline: "Shaping Spaces, Defining Futures",
    },
    theme: {
      primaryColor: "#C9A96E",
      secondaryColor: "#1A1A2E",
      accentColor: "#E8E8E0",
      backgroundColor: "#0D0D0D",
      textColor: "#F5F5F0",
      fontHeading: "Cormorant Garamond",
      fontBody: "DM Sans",
      defaultMode: "dark",
    },
    hero: {
      slides: [
        {
          imageUrl: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=1920&q=80",
          heading: "Shaping Spaces,\nDefining Futures",
          subheading: "Award-winning architecture and interior design studio",
          ctaPrimary: { text: "View Our Work", url: "/projects" },
          ctaSecondary: { text: "Get In Touch", url: "/contact" },
          order: 0,
        },
        {
          imageUrl: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1920&q=80",
          heading: "Architecture\nIs Art",
          subheading: "We create buildings that inspire, endure and transform communities",
          ctaPrimary: { text: "Our Services", url: "/services" },
          ctaSecondary: { text: "About Us", url: "/about" },
          order: 1,
        },
        {
          imageUrl: "https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=1920&q=80",
          heading: "Precision in\nEvery Detail",
          subheading: "From concept to completion, excellence in every line",
          ctaPrimary: { text: "Explore Projects", url: "/projects" },
          ctaSecondary: { text: "Contact Us", url: "/contact" },
          order: 2,
        },
      ],
      autoplaySpeed: 5000,
      transition: "fade",
    },
    contact: {
      phone: "+1 (212) 555-0147",
      email: "hello@arcstudio.com",
      address: "123 Architecture Avenue, Suite 4F, New York, NY 10001",
      mapLat: 40.7128,
      mapLng: -74.006,
      workingHours: "Monday – Friday: 9:00 AM – 6:00 PM",
    },
    social: {
      instagram: "https://instagram.com/arcstudio",
      linkedin: "https://linkedin.com/company/arcstudio",
      twitter: "https://twitter.com/arcstudio",
      behance: "https://behance.net/arcstudio",
    },
    about: {
      storyTitle: "Our Story",
      story: "Founded in 2005 by visionary architect Elena Vasquez, ArcStudio has grown from a boutique studio into one of New York's most celebrated architectural practices. Our work spans residential masterpieces, landmark commercial developments, and transformative public spaces across five continents.\n\nWe believe architecture is more than construction—it is the art of creating environments that elevate the human experience. Every project begins with listening: to our clients, to the land, to the culture of a place.",
      vision: "To redefine the built environment through architecture that is beautiful, sustainable, and deeply human.",
      mission: "We craft spaces that stand at the intersection of art and function—buildings that inspire their inhabitants and enrich the communities they serve.",
      stats: [
        { label: "Projects Completed", value: "240+" },
        { label: "Awards Won", value: "38" },
        { label: "Years Experience", value: "19" },
        { label: "Countries", value: "12" },
      ],
    },
    features: {
      testimonials: true,
      gallery: true,
      animations: true,
      darkMode: true,
    },
    seo: {
      metaTitle: "ArcStudio | Architecture & Interior Design",
      metaDescription: "Award-winning architecture and interior design studio in New York. Residential, commercial and cultural projects across the globe.",
    },
  });
  console.log("✅ Settings seeded");

  // ─── Services ─────────────────────────────────────────────────
  await Service.insertMany([
    { title: "Architectural Design", shortDescription: "Complete architectural design from concept to construction documentation.", description: "Our architectural design service covers every phase of your project. We begin with an in-depth consultation to understand your vision, constraints, and goals. From schematic design through design development and construction documents, our team ensures every detail is meticulously crafted.", icon: "building-2", features: ["Schematic Design", "Design Development", "Construction Documents", "3D Visualization", "Permit Assistance"], status: "published", order: 1 },
    { title: "Interior Architecture", shortDescription: "Transforming interiors into extraordinary living and working spaces.", description: "We approach interior architecture as an extension of our architectural philosophy—spaces should be beautiful, functional, and timeless. Our interior team works with the finest materials and craftspeople to create interiors that feel both curated and deeply personal.", icon: "sofa", features: ["Space Planning", "Material Selection", "Custom Furniture Design", "Lighting Design", "Art Consultation"], status: "published", order: 2 },
    { title: "Urban Planning", shortDescription: "Master planning and urban design for communities of the future.", description: "Our urban planning practice addresses the complex challenges of contemporary city-making. From mixed-use master plans to neighborhood revitalization strategies, we design urban environments that are livable, sustainable, and economically vibrant.", icon: "map", features: ["Master Planning", "Zoning Analysis", "Community Engagement", "Sustainability Strategy", "Infrastructure Design"], status: "published", order: 3 },
    { title: "Landscape Design", shortDescription: "Seamlessly integrating nature and architecture.", description: "The relationship between a building and its landscape is fundamental to great architecture. Our landscape design service creates outdoor environments that complement and enhance the built work—from intimate private gardens to expansive public parks.", icon: "trees", features: ["Site Analysis", "Planting Design", "Hardscape Design", "Water Features", "Sustainable Landscaping"], status: "published", order: 4 },
    { title: "Renovation & Restoration", shortDescription: "Breathing new life into existing structures with sensitivity and skill.", description: "Historic buildings carry stories worth preserving. Our renovation and restoration practice combines deep respect for existing fabric with contemporary programs and performance standards. We have restored landmarks ranging from Beaux-Arts townhouses to mid-century modernist icons.", icon: "wrench", features: ["Historic Preservation", "Adaptive Reuse", "Structural Assessment", "Material Conservation", "Modern Upgrades"], status: "published", order: 5 },
    { title: "Project Management", shortDescription: "Expert oversight ensuring on-time, on-budget delivery.", description: "Architecture is only as good as its execution. Our project management team brings decades of experience coordinating complex construction projects. We act as your advocate throughout the construction process, ensuring design intent is maintained and quality standards are met.", icon: "clipboard-list", features: ["Budget Management", "Schedule Control", "Contractor Coordination", "Quality Assurance", "Risk Management"], status: "published", order: 6 },
  ]);
  console.log("✅ Services seeded");

  // ─── Team ──────────────────────────────────────────────────────
  await Team.insertMany([
    { name: "Elena Vasquez", role: "Founding Principal & Lead Architect", bio: "Elena founded ArcStudio in 2005 after graduating top of her class from Harvard GSD. Her work has been recognized by the AIA, the Pritzker Prize committee, and featured in Architectural Digest. She brings a rare combination of technical rigour and poetic sensibility to every project.", image: { url: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80" }, specialties: ["Residential", "Cultural", "Urban Design"], order: 1, status: "active" },
    { name: "Marcus Chen", role: "Principal, Commercial Projects", bio: "Marcus leads our commercial practice with over 15 years of experience delivering complex, large-scale projects across North America and Asia. A graduate of Columbia GSAPP, he is known for his ability to balance programmatic complexity with spatial clarity.", image: { url: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800&q=80" }, specialties: ["Commercial", "Mixed-Use", "High-Rise"], order: 2, status: "active" },
    { name: "Sofia Marchetti", role: "Interior Architecture Director", bio: "Sofia trained at the Politecnico di Milano before joining ArcStudio in 2012. Her interiors are celebrated for their exquisite materiality and the way they hold light. She has overseen landmark residential and hospitality projects across the US and Europe.", image: { url: "https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=800&q=80" }, specialties: ["Interior Design", "Residential", "Hospitality"], order: 3, status: "active" },
    { name: "James Okoye", role: "Associate Principal, Sustainability", bio: "James leads our sustainability practice, ensuring that every ArcStudio project meets the highest environmental standards. He holds LEED AP certification and has pioneered the firm's net-zero design methodology, which is now a core part of our design process.", image: { url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80" }, specialties: ["Sustainable Design", "LEED", "Passive House"], order: 4, status: "active" },
  ]);
  console.log("✅ Team seeded");

  // ─── Projects ──────────────────────────────────────────────────
  await Project.insertMany([
    { title: "The Meridian Penthouse", slug: "meridian-penthouse", description: "A 6,000 sq ft full-floor penthouse atop a 42-story residential tower in Manhattan's West Village. The design dissolves the boundary between inside and outside through floor-to-ceiling glazing, a wrap-around terrace, and a material palette—honed marble, brushed bronze, aged oak—that mirrors the natural landscape beyond.", shortDescription: "Full-floor penthouse with panoramic views over the Hudson.", category: "residential", status: "published", featured: true, images: [{ url: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80", isCover: true }, { url: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80" }, { url: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&q=80" }], location: { city: "New York", country: "USA" }, year: 2022, area: { value: 557, unit: "sqm" }, order: 1 },
    { title: "Volta Cultural Centre", slug: "volta-cultural-centre", description: "A landmark cultural institution housing performance spaces, galleries, and public gardens on a 3-acre site in Chicago's Pilsen neighborhood. The building's cascading copper volumes reference the industrial heritage of the area while opening generously to the street and the sky.", shortDescription: "Multi-arts cultural centre with cascading copper volumes.", category: "cultural", status: "published", featured: true, images: [{ url: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1200&q=80", isCover: true }, { url: "https://images.unsplash.com/photo-1509644851169-2acc08aa25b5?w=1200&q=80" }], location: { city: "Chicago", country: "USA" }, year: 2021, area: { value: 4200, unit: "sqm" }, order: 2 },
    { title: "Casa Branca", slug: "casa-branca", description: "A private villa on the São Paulo plateau designed around a single, dramatic interior courtyard. The architecture is deliberately austere on the exterior—white concrete planes, no ornament—but explodes into complexity and warmth inside: double-height spaces, timber ceilings, a 20m lap pool.", shortDescription: "Austere exterior, warm tropical interior villa in Brazil.", category: "residential", status: "published", featured: true, images: [{ url: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&q=80", isCover: true }, { url: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&q=80" }], location: { city: "São Paulo", country: "Brazil" }, year: 2023, area: { value: 720, unit: "sqm" }, order: 3 },
    { title: "Nexus Tower", slug: "nexus-tower", description: "A 28-story mixed-use tower in Austin delivering 200,000 sq ft of class-A office space, ground-floor retail, and a publicly accessible sky terrace on the 15th floor. The tower's diagrid structural system—expressed on the façade—reduces material usage by 30% compared to conventional construction.", shortDescription: "Diagrid mixed-use tower with public sky terrace.", category: "commercial", status: "published", featured: false, images: [{ url: "https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=1200&q=80", isCover: true }], location: { city: "Austin", country: "USA" }, year: 2022, area: { value: 18580, unit: "sqm" }, order: 4 },
    { title: "The Bower Hotel", slug: "bower-hotel", description: "Interior architecture for a 120-room boutique hotel in Portland's Pearl District. Each floor adopts a distinct material identity—raw steel, aged leather, woven rattan—while sharing a unified language of warm lighting, generous proportions, and carefully curated artwork.", shortDescription: "120-room boutique hotel with floor-by-floor material narratives.", category: "interior", status: "published", featured: false, images: [{ url: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1200&q=80", isCover: true }, { url: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=1200&q=80" }], location: { city: "Portland", country: "USA" }, year: 2020, area: { value: 8200, unit: "sqm" }, order: 5 },
    { title: "Hillside Residence", slug: "hillside-residence", description: "A family home on a challenging hillside site in Malibu, engineered to step down the slope in three distinct volumes. Floor-to-ceiling glass captures ocean views from every room while deep overhangs and operable louvers manage solar gain and maintain privacy.", shortDescription: "Three-volume Malibu residence stepping down a hillside.", category: "residential", status: "published", featured: false, images: [{ url: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80", isCover: true }], location: { city: "Malibu", country: "USA" }, year: 2023, area: { value: 465, unit: "sqm" }, order: 6 },
  ]);
  console.log("✅ Projects seeded");

  // ─── Testimonials ─────────────────────────────────────────────
  await Testimonial.insertMany([
    { clientName: "Richard & Anne Hartley", clientTitle: "Homeowners", review: "Working with ArcStudio was the most extraordinary creative experience of our lives. Elena and her team didn't just design a house—they designed a way of living. Every morning we wake up and feel genuinely moved by the beauty of the spaces they created.", rating: 5, featured: true, status: "published", order: 1 },
    { clientName: "David Kim", clientTitle: "CEO", company: "Nexus Properties", review: "We chose ArcStudio over several larger firms because of their clarity of vision and their track record of delivery. The Nexus Tower project came in on time, on budget, and exceeded our expectations aesthetically and commercially. The public terrace has become one of Austin's most-loved spaces.", rating: 5, featured: true, status: "published", order: 2 },
    { clientName: "Claudia Ferreira", clientTitle: "Director", company: "Volta Foundation", review: "The Volta Cultural Centre has transformed our neighborhood. ArcStudio understood from the first meeting that this building needed to be as generous to the community as it is architecturally ambitious. They achieved both with remarkable grace.", rating: 5, featured: true, status: "published", order: 3 },
    { clientName: "Thomas & Mei Yoshi", clientTitle: "Homeowners", review: "From schematic design through construction, the ArcStudio team was professional, responsive, and endlessly creative. Our home in Malibu is beyond what we imagined possible. Every guest who visits asks who designed it.", rating: 5, featured: false, status: "published", order: 4 },
    { clientName: "Sarah Mitchell", clientTitle: "General Manager", company: "The Bower Hotel", review: "Sofia and the interior team brought a level of sophistication and storytelling to the Bower that we had only dreamed of. The hotel has been fully booked since opening and the interiors are regularly cited in press coverage as the defining feature.", rating: 5, featured: false, status: "published", order: 5 },
  ]);
  console.log("✅ Testimonials seeded");

  console.log("\n🎉 Seeding complete!");
  console.log("─────────────────────────────────");
  console.log("Admin login:");
  console.log("  Email:    admin@arcstudio.com");
  console.log("  Password: Admin@123456");
  console.log("─────────────────────────────────\n");
  process.exit(0);
};

seed().catch(err => {
  console.error("Seed error:", err);
  process.exit(1);
});
