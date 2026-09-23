/**
 * Graphic design projects shown in the Project Gallery.
 *
 * Kept in a plain module so the list stays in one place: adding a project is a
 * single object here (title + url + category + cover).
 */
export interface GraphicDesignProject {
  title: string;
  /** Behance project page, opened in a new tab. */
  url: string;
  /** Category line shown under the title, e.g. "Graphic design". */
  category: string;
  /** Cover artwork served from /public/assets/graphic-design. */
  cover: string;
}

export const graphicDesignProjects: GraphicDesignProject[] = [
  {
    title: "23Bouquet — Custom Bouquet E-Commerce UX Case Study",
    url: "https://www.behance.net/gallery/254568829/23Bouquet-Custom-Bouquet-E-Commerce-UX-Case-Study",
    category: "Graphic design",
    cover: "/assets/graphic-design/1.webp",
  },
  {
    title: "Graphic Design Portfolio 2026",
    url: "https://www.behance.net/gallery/244914913/Graphic-Design-Portfolio-2026-Faishal",
    category: "Graphic design",
    cover: "/assets/graphic-design/2.webp",
  },
  {
    title: "Mid-Year Portfolio 2025",
    url: "https://www.behance.net/gallery/229302087/Mid-Year-Portofolio-2025",
    category: "Graphic design",
    cover: "/assets/graphic-design/3.webp",
  },
  {
    title: "Portfolio Design 2025",
    url: "https://www.behance.net/gallery/220094373/Portofolio-Design-Faishal-2025",
    category: "Graphic design",
    cover: "/assets/graphic-design/4.webp",
  },
];
