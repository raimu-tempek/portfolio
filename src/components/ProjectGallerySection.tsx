"use client";

import React, { Fragment, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  graphicDesignProjects,
  type GraphicDesignProject,
} from "@/lib/graphicDesignProjects";
import {
  ArrowRight,
  ChevronDown,
  ExternalLink,
  Github,
  LayoutGrid,
  Play,
  type LucideIcon,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

/* ------------------------------------------------------------------
 * Types
 * ------------------------------------------------------------------ */

type TabId = "all" | "design" | "thumb" | "video" | "web";

/** Button rendered at the bottom of a card (repo / live demo). */
interface ProjectAction {
  icon: LucideIcon;
  label: string;
  href: string;
  variant: "outline" | "accent";
}

/**
 * Card used by the Website panel (and the Website group inside "All"): white card
 * with a rounded cover, bold title, gray description and action buttons.
 */
interface ProjectCard {
  title: string;
  description: string;
  /** Cover aspect ratio class, e.g. "aspect-[16/10]". */
  aspect: string;
  /** Real cover image. Without it, the cover stays a solid gray placeholder. */
  image?: { src: string; alt: string };
  /** Small tech-stack pills shown between the description and the buttons. */
  techStack?: string[];
  /** Buttons rendered under the description (replaces "Discover more"). */
  actions?: ProjectAction[];
}

/** YouTube Short shown by the Video editing panel. */
interface VideoItem {
  /** YouTube video id — used for the thumbnail and the embed URL. */
  id: string;
  /** Accessible label only (alt + aria-label); never rendered inside the card. */
  title: string;
}

/** Tile used by the Thumbnail design panel — a real thumbnail image. */
interface MediaTile {
  id: string;
  /** Generic label for this tile; also used as the image alt text. */
  title: string;
  /** Thumbnail file served from /public/assets/thumbnail. */
  src: string;
}

/* ------------------------------------------------------------------
 * Data — one array per category
 * ------------------------------------------------------------------ */

// Graphic design — the projects and their local cover artwork live in
// `src/lib/graphicDesignProjects.ts`, imported above.

// Thumbnail design — the real thumbnails, one item per file, in file order
// (1.webp … 13.webp) so the grid reads the same way as the assets folder.
const thumbnailDesignProjects: MediaTile[] = Array.from(
  { length: 13 },
  (_, index) => {
    const number = index + 1;

    return {
      id: `thumb-${number}`,
      title: `Thumbnail ${number}`,
      src: `/assets/thumbnail/${number}.webp`,
    };
  }
);

// Video editing — YouTube Shorts, so every card is a vertical 9:16 tile with the
// YouTube thumbnail and a play button. The embed iframe is created only after a
// click (see ShortVideoCard): nothing is loaded from YouTube on page load, nothing
// autoplays, and the audio is on.
const videoEditingProjects: VideoItem[] = [
  { id: "CffdI_JnaCc", title: "Video 1" },
  { id: "jDjuSFbpOVI", title: "Video 2" },
  { id: "H2ps6VmotpY", title: "Video 3" },
  { id: "CfYLQ7jkc1g", title: "Video 4" },
  { id: "leNDp44s69s", title: "Video 5" },
  { id: "WVMjYCkukKM", title: "Video 6" },
  { id: "0HRWzIpjTNw", title: "Video 7" },
  { id: "JnjQ7pTHmcg", title: "Video 8" },
  { id: "GHPe640svMY", title: "Video 9" },
  { id: "Cp0vS5pdt5g", title: "Video 10" },
  { id: "Hd1CdfdQ0b0", title: "Video 11" },
  { id: "yoEwZqHmZvU", title: "Video 12" },
  { id: "245Vent-7sU", title: "Video 13" },
  { id: "fekkStXHMyU", title: "Video 14" },
  { id: "017rzOzDz6Q", title: "Video 15" },
];

// Website — placeholder covers, placeholder tech-stack pills, and pill-shaped
// GitHub + Live demo buttons.
const websiteProjects: ProjectCard[] = [
  {
    title: "Company profile website",
    description:
      "Placeholder — a responsive company profile site with clean layouts and accessible navigation.",
    aspect: "aspect-[16/10]",
    techStack: ["Tech A", "Tech B", "Tech C", "Tech D"],
    actions: [
      { icon: Github, label: "GitHub", href: "#", variant: "outline" },
      { icon: ExternalLink, label: "Live demo", href: "#", variant: "accent" },
    ],
  },
  {
    title: "Offline-first POS web app",
    description:
      "Placeholder — a cashier app that keeps working without internet and stores data locally.",
    aspect: "aspect-[16/10]",
    techStack: ["Tech A", "Tech B", "Tech C"],
    actions: [
      { icon: Github, label: "GitHub", href: "#", variant: "outline" },
      { icon: ExternalLink, label: "Live demo", href: "#", variant: "accent" },
    ],
  },
];

/* ------------------------------------------------------------------
 * Layout + tab styling
 * ------------------------------------------------------------------ */

// Grid recipes shared by every panel: 1 column on phones (< 640px), 2 columns on tablets
// (640–1024px) and the original desktop count from `lg` up. `sm`/`lg` are used on purpose
// so the tablet range never falls back to the single-column phone layout.

const CARD_GRID_2_COL = "grid-cols-1 sm:grid-cols-2 gap-6";
const CARD_GRID_3_COL = "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6";
const TILE_GRID_3_COL = "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5";

// Tab bar: transparent and plain — no pill, background or border. The highlighted look
// (accent label + 4px underline that spans only the label text) is defined once in
// TAB_HIGHLIGHT_CLASS and used for BOTH the active tab and a hovered inactive tab, so
// the two states can never drift apart. Every tab takes an equal share (flex-1) so the
// bar lines up with the section heading above it, and on narrow screens the labels keep
// their content width while the bar scrolls sideways instead of wrapping. The label steps
// down to 16px on phones (with tighter padding) so the bar needs less sideways scrolling;
// the desktop size (18px) is untouched.
const TAB_BASE_CLASS =
  "flex-1 whitespace-nowrap px-3.5 py-2 text-center font-satoshi text-[16px] leading-none transition-colors duration-200 focus-visible:outline-none sm:px-4 sm:text-[18px]";
const TAB_HIGHLIGHT_CLASS = "font-semibold text-accent";
const TAB_IDLE_CLASS = "font-normal text-textSecondary";
const TAB_UNDERLINE_CLASS =
  "absolute left-0 top-full mt-2 h-1 w-full origin-left rounded-full bg-accent transition-transform duration-200 ease-out";

// One shared hover treatment for every card in the gallery, lifted from the Graphic
// design card so no card can drift to different numbers. Both parts sit inside
// `(hover: hover)` so a tap on a touch device cannot leave a card stuck hovered.
const GALLERY_CARD_HOVER_CLASS =
  "shadow-sm transition-[transform,box-shadow] duration-300 [@media(hover:hover)]:hover:scale-[1.02] [@media(hover:hover)]:hover:shadow-md";
const GALLERY_MEDIA_ZOOM_CLASS =
  "transition-transform duration-300 [@media(hover:hover)]:group-hover:scale-105";

/* ------------------------------------------------------------------
 * Tabs + panels
 * ------------------------------------------------------------------ */

/**
 * How many items the "All" tab previews per category before the user expands it.
 * Only these numbers need editing — the previews, the button label and its "(N)"
 * total all follow from them.
 */
const PREVIEW_COUNT = {
  graphic: 2,
  thumbnail: 3,
  video: 3,
  website: 3,
} as const;

type PreviewCategory = keyof typeof PREVIEW_COUNT;

/** A panel is a stack of groups so the "All" panel can combine every layout. */
type PanelGroup =
  | {
      layout: "cards";
      columns: string;
      items: ProjectCard[];
      previewKey?: PreviewCategory;
    }
  | {
      layout: "designCards";
      columns: string;
      aspect: string;
      items: GraphicDesignProject[];
      previewKey?: PreviewCategory;
    }
  | {
      layout: "videos";
      columns: string;
      aspect: string;
      items: VideoItem[];
      previewKey?: PreviewCategory;
    }
  | {
      layout: "tiles";
      columns: string;
      aspect: string;
      items: MediaTile[];
      previewKey?: PreviewCategory;
    };

/**
 * Expand/collapse animation of the "All" preview. `PREVIEW_TRANSITION_MS` is handed to
 * the collapsible wrapper as an inline `transition-duration` and is also the delay used
 * before the page glides back to the filter bar on collapse, so the two stay in sync.
 * The revealed items fade/slide in with a small stagger, capped so a long list does not
 * crawl.
 */
const PREVIEW_TRANSITION_MS = 600;
const EXTRA_ITEM_STAGGER_MS = 40;
const EXTRA_ITEM_STAGGER_MAX_MS = 300;

/**
 * Vertical rhythm matching each layout's grid gap (`gap-6` for the card and video grids,
 * `gap-2.5` for the thumbnail tiles). It is applied inside the collapsible wrapper, so
 * the rows revealed by "View all projects" keep the spacing of the rows above them and
 * get clipped away when the group is closed.
 */
const GROUP_GAP_SPACER_CLASS: Record<PanelGroup["layout"], string> = {
  cards: "pt-6",
  designCards: "pt-6",
  videos: "pt-6",
  tiles: "pt-2.5",
};

/**
 * React 18 does not know the `inert` attribute yet, so it is passed as the empty string
 * the HTML boolean attribute is written as (a boolean would log a warning). It keeps the
 * closed extra rows out of the tab order and the accessibility tree.
 */
const INERT_PROPS = { inert: "" } as unknown as React.HTMLAttributes<HTMLDivElement>;

interface Panel {
  id: TabId;
  label: string;
  groups: PanelGroup[];
}

const tabPanels: Panel[] = [
  {
    id: "all",
    label: "All",
    // Combination of every panel below, in tab order. Only the preview of each
    // group is rendered here (see PREVIEW_COUNT); "View all projects" expands them.
    groups: [
      {
        layout: "designCards",
        columns: CARD_GRID_2_COL,
        aspect: "aspect-[16/10]",
        items: graphicDesignProjects,
        previewKey: "graphic",
      },
      {
        layout: "tiles",
        columns: TILE_GRID_3_COL,
        aspect: "aspect-video",
        items: thumbnailDesignProjects,
        previewKey: "thumbnail",
      },
      {
        layout: "videos",
        columns: CARD_GRID_3_COL,
        aspect: "aspect-[9/16]",
        items: videoEditingProjects,
        previewKey: "video",
      },
      {
        layout: "cards",
        columns: CARD_GRID_2_COL,
        items: websiteProjects,
        previewKey: "website",
      },
    ],
  },
  {
    id: "design",
    label: "Graphic design",
    groups: [
      {
        layout: "designCards",
        columns: CARD_GRID_2_COL,
        aspect: "aspect-[16/10]",
        items: graphicDesignProjects,
      },
    ],
  },
  {
    id: "thumb",
    label: "Thumbnail design",
    groups: [
      {
        layout: "tiles",
        columns: TILE_GRID_3_COL,
        aspect: "aspect-video",
        items: thumbnailDesignProjects,
      },
    ],
  },
  {
    id: "video",
    label: "Video editing",
    groups: [
      {
        layout: "videos",
        columns: CARD_GRID_3_COL,
        aspect: "aspect-[9/16]",
        items: videoEditingProjects,
      },
    ],
  },
  {
    id: "web",
    label: "Website",
    groups: [
      { layout: "cards", columns: CARD_GRID_2_COL, items: websiteProjects },
    ],
  },
];

const DEFAULT_TAB: TabId = "all";

/* ------------------------------------------------------------------
 * Panel pieces
 * ------------------------------------------------------------------ */

/**
 * Project card — same style as the old "Selected works" cards: white card with a
 * large rounded cover on top, bold title, gray description, then either the
 * "Discover more" link or a pair of action buttons (GitHub + Live demo).
 */
function ProjectCardItem({ item }: { item: ProjectCard }) {
  const hasActions = Boolean(item.actions && item.actions.length > 0);

  return (
    <div className={`group flex h-full flex-col overflow-hidden rounded-4xl border border-borderSubtle bg-white ${GALLERY_CARD_HOVER_CLASS}`}>
      {/* Cover: real image when available, otherwise a solid gray placeholder */}
      <div
        className={`relative w-full shrink-0 overflow-hidden bg-gray-200 ${item.aspect}`}
      >
        {item.image ? (
          <Image
            src={item.image.src}
            alt={item.image.alt}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1080px) 50vw, 496px"
            className={`object-cover ${GALLERY_MEDIA_ZOOM_CLASS}`}
          />
        ) : null}
      </div>

      <div className="flex flex-1 flex-col p-6 md:p-7">
        <h3 className="font-satoshi font-bold text-[20px] md:text-[22px] text-textPrimary">
          {item.title}
        </h3>

        {/* Description and the action buttons share one width, so the two
            buttons line up exactly with the description's left/right edges. */}
        <div className="w-full max-w-[420px]">
          <p className="mt-2 font-satoshi text-[14px] leading-relaxed text-textSecondary">
            {item.description}
          </p>

          {/* Tech stack pills — flex-wrap so they never overflow the card */}
          {item.techStack && item.techStack.length > 0 ? (
            <div className="mt-3 flex flex-wrap gap-1.5">
              {item.techStack.map((tech) => (
                <span
                  key={`${item.title}-tech-${tech}`}
                  className="rounded-full border border-borderSubtle bg-surfaceSubtle px-2.5 py-1 font-satoshi text-[14px] leading-none text-textPrimary"
                >
                  {tech}
                </span>
              ))}
            </div>
          ) : null}

          {hasActions ? (
            /* Two equal 1fr tracks — Tailwind's grid-cols-2 compiles to
               `repeat(2, minmax(0, 1fr))`, i.e. two identical columns whose
               minimum is 0 so content can never widen a track.
               Each button is width:100% of its own column, so GitHub and
               Live demo are exactly half of the description block above,
               regardless of how long their labels are. */
            <div className="mt-4 grid grid-cols-2 items-stretch gap-2">
              {item.actions?.map((action, index) => {
                const ActionIcon = action.icon;

                return (
                  <a
                    key={`${item.title}-action-${index}`}
                    href={action.href}
                    className={`flex !w-full min-w-0 items-center justify-center gap-1.5 rounded-full px-3 py-2 font-satoshi text-[12px] transition-colors ${
                      action.variant === "accent"
                        ? "bg-accent text-white hover:bg-blue-600"
                        : "border border-borderSubtle bg-surfaceSubtle text-textPrimary hover:border-accent hover:text-accent"
                    }`}
                  >
                    <ActionIcon size={14} className="shrink-0" />
                    <span className="truncate">{action.label}</span>
                  </a>
                );
              })}
            </div>
          ) : null}
        </div>

        {/* Cards without action buttons keep the "Discover more" link */}
        {hasActions ? null : (
          <div className="mt-6 flex flex-1 items-end justify-end">
            <Link
              href="#"
              className="inline-flex items-center gap-1.5 font-satoshi font-bold text-[14px] text-textPrimary hover:text-accent transition-colors group/link"
            >
              <span>Discover more</span>
              <ArrowRight
                size={16}
                className="group-hover/link:translate-x-1 transition-transform"
              />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

/**
 * Graphic design card — the entire card is one <a>, so a click anywhere opens the
 * project's Behance page in a new tab (target="_blank" + rel="noopener noreferrer").
 * The cover is the local artwork from /public/assets/graphic-design; if that file
 * fails to load the card keeps the solid gray placeholder (same style as the other
 * panels), and the small external-link cue next to the title plus the hover lift
 * make it obvious the card is clickable.
 */
function DesignProjectCardItem({
  item,
  aspect,
}: {
  item: GraphicDesignProject;
  aspect: string;
}) {
  // Local cover file, so a failed load falls back to the placeholder instead of
  // leaving a broken image inside the card.
  const [coverFailed, setCoverFailed] = useState(false);
  const coverSrc = coverFailed ? undefined : item.cover;

  return (
    <a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`group flex h-full flex-col overflow-hidden rounded-4xl border border-borderSubtle bg-white ${GALLERY_CARD_HOVER_CLASS} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2`}
    >
      {/* Cover: the local artwork, with the gray placeholder as fallback */}
      <div
        className={`relative w-full shrink-0 overflow-hidden bg-gray-200 ${aspect}`}
      >
        {coverSrc ? (
          <Image
            src={coverSrc}
            alt={`${item.title} — cover`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1080px) 50vw, 496px"
            className={`object-cover ${GALLERY_MEDIA_ZOOM_CLASS}`}
            onError={() => setCoverFailed(true)}
          />
        ) : null}
      </div>

      <div className="flex flex-1 items-start justify-between gap-3 p-6 md:p-7">
        <div className="min-w-0">
          <h3 className="font-satoshi font-bold text-[20px] md:text-[22px] text-textPrimary">
            {item.title}
          </h3>
          <p className="mt-1 font-satoshi text-[14px] text-textSecondary">
            {item.category}
          </p>
        </div>

        {/* Small cue that this card opens an external page in a new tab */}
        <ExternalLink
          size={16}
          aria-hidden="true"
          className="mt-1 shrink-0 text-textSecondary transition-colors duration-200 group-hover:text-accent"
        />
        <span className="sr-only">(opens in a new tab)</span>
      </div>
    </a>
  );
}

/**
 * Thumbnail tile — the real cover image inside the tile the panel already had
 * (same rounded-lg corners, subtle border and 16:9 aspect). `object-cover` keeps the
 * image filling the whole card without stretching it out of proportion, and the shared
 * gallery hover lifts the tile while the image zooms inside `overflow-hidden`, so the
 * scale never escapes the rounded corners.
 */
function MediaTileItem({ item, aspect }: { item: MediaTile; aspect: string }) {
  return (
    <div
      className={`group relative overflow-hidden rounded-lg border border-borderSubtle bg-white ${GALLERY_CARD_HOVER_CLASS} ${aspect}`}
    >
      <Image
        src={item.src}
        alt={item.title}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 344px"
        className={`object-cover ${GALLERY_MEDIA_ZOOM_CLASS}`}
      />
    </div>
  );
}

/**
 * YouTube Short card for the Video editing panel: the YouTube thumbnail plus a play
 * button, inside the same 9:16 rounded tile the panel already used.
 *
 * The embed iframe is only created after a click, so nothing is requested from
 * YouTube on page load and playback never starts by itself. There is deliberately no
 * `mute=1`, so the video plays with sound. `isPlaying` is owned by the section, which
 * allows a single card to play: choosing another card sends this one back to its
 * thumbnail.
 */
function ShortVideoCard({
  item,
  aspect,
  isPlaying,
  onPlay,
}: {
  item: VideoItem;
  aspect: string;
  isPlaying: boolean;
  onPlay: (id: string) => void;
}) {
  const [useFallbackThumbnail, setUseFallbackThumbnail] = useState(false);

  // maxresdefault is missing for some uploads (img.youtube.com answers 404), so a
  // failed load falls back to the always-present hqdefault.
  const thumbnailUrl = `https://img.youtube.com/vi/${item.id}/${
    useFallbackThumbnail ? "hqdefault" : "maxresdefault"
  }.jpg`;

  return (
    <div
      className={`relative w-full overflow-hidden rounded-4xl bg-black ${aspect}`}
    >
      {isPlaying ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${item.id}?autoplay=1&rel=0&playsinline=1`}
          title={item.title}
          allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
          allowFullScreen
          className="absolute inset-0 h-full w-full border-0"
        />
      ) : (
        <button
          type="button"
          onClick={() => onPlay(item.id)}
          aria-label={item.title}
          className="group absolute inset-0 h-full w-full cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent"
        >
          <img
            src={thumbnailUrl}
            alt={item.title}
            loading="lazy"
            decoding="async"
            onError={() => setUseFallbackThumbnail(true)}
            className={`absolute inset-0 h-full w-full object-cover ${GALLERY_MEDIA_ZOOM_CLASS}`}
          />
          <span className="absolute inset-0 flex items-center justify-center">
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-black/55 text-white backdrop-blur-sm transition-transform duration-200 group-hover:scale-110">
              <Play
                size={22}
                aria-hidden="true"
                className="translate-x-[1px] fill-current"
              />
            </span>
          </span>
        </button>
      )}
    </div>
  );
}

/** How many items a group keeps on screen; `undefined` = the whole group is visible. */
function previewLimitOf(group: { previewKey?: PreviewCategory }): number | undefined {
  return group.previewKey ? PREVIEW_COUNT[group.previewKey] : undefined;
}

/** Id of the collapsible wrapper that holds a group's extra rows. */
function extrasId(panelId: TabId, index: number): string {
  return `panel-${panelId}-extras-${index}`;
}

/** True when the visitor asked their operating system for less animation. */
function prefersReducedMotion(): boolean {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

/** Shared wiring for one group of a panel — see `GalleryGroupRows`. */
function groupRowProps(
  group: PanelGroup,
  index: number,
  panelId: TabId,
  expanded: boolean
) {
  return {
    previewLimit: previewLimitOf(group),
    columns: group.columns,
    spacerClass: GROUP_GAP_SPACER_CLASS[group.layout],
    extrasId: extrasId(panelId, index),
    expanded,
  };
}

/**
 * Collapsible wrapper for the rows the "All" preview adds. It is always rendered and
 * animates `grid-template-rows` from `0fr` to `1fr`, which lets the height animate to
 * the real content height without measuring anything in JS. While it is closed, `inert`
 * plus `aria-hidden` keep its content out of the tab order and the accessibility tree.
 */
function CollapsibleExtras({
  id,
  expanded,
  columns,
  spacerClass,
  children,
}: {
  id: string;
  expanded: boolean;
  columns: string;
  spacerClass: string;
  children: React.ReactNode;
}) {
  return (
    <div
      id={id}
      aria-hidden={expanded ? undefined : true}
      {...(expanded ? {} : INERT_PROPS)}
      style={{ transitionDuration: `${PREVIEW_TRANSITION_MS}ms` }}
      className={`grid transition-[grid-template-rows] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
        expanded ? "[grid-template-rows:1fr]" : "[grid-template-rows:0fr]"
      }`}
    >
      {/* `min-height: 0` + `overflow-hidden` is what lets the row collapse to nothing;
          the spacing lives inside so it gets clipped away when the group is closed. */}
      <div className="min-h-0 overflow-hidden">
        <div className={`grid ${columns} ${spacerClass}`}>{children}</div>
      </div>
    </div>
  );
}

/**
 * A single revealed item: fades and slides up while the wrapper opens, staggered 40ms per
 * item (capped at 300ms). Collapsing has no stagger and fades everything out in 200ms
 * while the height closes.
 */
function ExtraItemCell({
  index,
  expanded,
  children,
}: {
  index: number;
  expanded: boolean;
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        transitionDelay: expanded
          ? `${Math.min(index * EXTRA_ITEM_STAGGER_MS, EXTRA_ITEM_STAGGER_MAX_MS)}ms`
          : "0ms",
      }}
      className={`h-full transition-[opacity,transform] ease-out motion-reduce:transition-none ${
        expanded
          ? "translate-y-0 opacity-100 duration-[450ms]"
          : "translate-y-4 opacity-0 duration-200"
      }`}
    >
      {children}
    </div>
  );
}

/**
 * One group of the active panel: the items that are always on screen, followed by the
 * rows the "All" preview reveals. The extra rows are always mounted inside the
 * collapsible wrapper — only its height animates, they are never conditionally rendered.
 */
function GalleryGroupRows<T>({
  items,
  previewLimit,
  columns,
  spacerClass,
  extrasId: extrasWrapperId,
  expanded,
  itemKey,
  renderItem,
}: {
  items: T[];
  previewLimit: number | undefined;
  columns: string;
  spacerClass: string;
  extrasId: string;
  expanded: boolean;
  itemKey: (item: T) => string;
  renderItem: (item: T) => React.ReactNode;
}) {
  const previewItems =
    previewLimit === undefined ? items : items.slice(0, previewLimit);
  const extraItems = previewLimit === undefined ? [] : items.slice(previewLimit);

  return (
    <>
      <div className={`grid ${columns}`}>
        {previewItems.map((item) => (
          <Fragment key={itemKey(item)}>{renderItem(item)}</Fragment>
        ))}
      </div>

      <CollapsibleExtras
        id={extrasWrapperId}
        expanded={expanded}
        columns={columns}
        spacerClass={extraItems.length > 0 ? spacerClass : ""}
      >
        {extraItems.map((item, index) => (
          <ExtraItemCell key={itemKey(item)} index={index} expanded={expanded}>
            {renderItem(item)}
          </ExtraItemCell>
        ))}
      </CollapsibleExtras>
    </>
  );
}

/* ------------------------------------------------------------------
 * Section
 * ------------------------------------------------------------------ */

export default function ProjectGallerySection() {
  const [activeTab, setActiveTab] = useState<TabId>(DEFAULT_TAB);
  // The "All" tab only previews a few items per category until this is toggled.
  const [showAllProjects, setShowAllProjects] = useState(false);
  // Only one YouTube card may play at a time: this holds its id, while every other
  // card stays on its thumbnail.
  const [playingVideoId, setPlayingVideoId] = useState<string | null>(null);
  // Scroll target used when the "All" preview collapses again.
  const filterBarRef = useRef<HTMLDivElement | null>(null);
  // Tab currently hovered, so an inactive tab can borrow the active look.
  const [hoveredTab, setHoveredTab] = useState<TabId | null>(null);

  const activePanel =
    tabPanels.find((panel) => panel.id === activeTab) ?? tabPanels[0];

  // Total number of works behind the "All" tab, used for the expand button label.
  const totalProjectCount = activePanel.groups.reduce(
    (total, group) => total + group.items.length,
    0
  );
  // Only the "All" panel carries preview keys, so every other tab shows all of its
  // items and gets no expand button.
  const hasPreview = activePanel.groups.some(
    (group) => group.previewKey !== undefined
  );
  // Collapsible regions the button opens, so `aria-controls` points at real elements
  // (only the groups that actually have extra rows).
  const collapsibleIds = activePanel.groups
    .map((group, index) => {
      const limit = previewLimitOf(group);
      return limit !== undefined && group.items.length > limit
        ? extrasId(activePanel.id, index)
        : null;
    })
    .filter((id): id is string => id !== null);

  /**
   * Expands the "All" preview, or collapses it again.
   *
   * Expanding only flips the state: the extra rows are always mounted and their height
   * animates, and with scroll anchoring disabled the viewport stays exactly where it is,
   * so no manual scrolling is needed. Collapsing closes the height first and only then
   * glides back to the filter bar, so the two movements do not fight each other.
   */
  const togglePreview = () => {
    setPlayingVideoId(null);

    if (showAllProjects) {
      setShowAllProjects(false);

      const reducedMotion = prefersReducedMotion();
      window.setTimeout(
        () => {
          filterBarRef.current?.scrollIntoView({
            behavior: reducedMotion ? "instant" : "smooth",
            block: "start",
          });
        },
        reducedMotion ? 0 : PREVIEW_TRANSITION_MS
      );
      return;
    }

    setShowAllProjects(true);
  };

  /**
   * Only devices that really support hover get the tab hover state, which is the
   * `@media (hover: hover)` half of the requirement: a tap on a phone can therefore
   * never leave a tab stuck looking active.
   */
  const highlightTabOnHover = (id: TabId) => {
    if (window.matchMedia("(hover: hover)").matches) setHoveredTab(id);
  };

  return (
    <section
      id="works"
      className="max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20 [overflow-anchor:none]"
    >
      {/* Section heading */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="mb-6 md:mb-8"
      >
        <h2 className="font-satoshi font-bold text-[28px] md:text-[34px] text-textPrimary tracking-tight">
          Selected Work
        </h2>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {/* Filter bar — transparent, full width, flush with the heading container above
            it. The bottom padding leaves room for the tab underline so the horizontal
            scroll container cannot clip it; the scrollbar itself stays hidden. */}
        <div ref={filterBarRef} className="mb-6 md:mb-8 scroll-mt-24">
          <div
            role="tablist"
            aria-label="Project categories"
            className="flex w-full items-center gap-1 overflow-x-auto pb-3 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {tabPanels.map((panel) => {
              const isActive = panel.id === activeTab;
              // A hovered inactive tab borrows exactly the active look.
              const isHighlighted = isActive || hoveredTab === panel.id;

              return (
                <button
                  key={panel.id}
                  id={`tab-${panel.id}`}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={`panel-${panel.id}`}
                  onClick={() => {
                    setActiveTab(panel.id);
                    // Every tab opens in preview mode again, with nothing playing.
                    setShowAllProjects(false);
                    setPlayingVideoId(null);
                  }}
                  onMouseEnter={() => highlightTabOnHover(panel.id)}
                  onMouseLeave={() => setHoveredTab(null)}
                  className={`${TAB_BASE_CLASS} ${
                    isHighlighted ? TAB_HIGHLIGHT_CLASS : TAB_IDLE_CLASS
                  }`}
                >
                  {/* The underline sits under the label only, so it is exactly as wide as
                      the text. It stays mounted and simply scales in, which gives the
                      active tab and a hovered tab the same 200ms animation. */}
                  <span className="relative inline-block">
                    {panel.label}
                    <span
                      aria-hidden="true"
                      className={`${TAB_UNDERLINE_CLASS} ${
                        isHighlighted ? "scale-x-100" : "scale-x-0"
                      }`}
                    />
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Only the active panel is rendered. `overflow-anchor: none` stops the browser
            from anchoring the scroll position to the expand button while the grid above
            it grows, which would otherwise push the newly revealed items out of view. */}
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={activePanel.id}
            id={`panel-${activePanel.id}`}
            role="tabpanel"
            aria-labelledby={`tab-${activePanel.id}`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="[overflow-anchor:none]"
          >
            {activePanel.groups.map((group, index) => {
              // Shared wiring for this group's preview rows and collapsible extras.
              const rowProps = groupRowProps(
                group,
                index,
                activePanel.id,
                showAllProjects
              );

              return (
                <div
                  key={`${activePanel.id}-group-${index}`}
                  className={index > 0 ? "mt-6 md:mt-8" : ""}
                >
                  {group.layout === "cards" ? (
                    <GalleryGroupRows
                      {...rowProps}
                      items={group.items}
                      itemKey={(item) => item.title}
                      renderItem={(item) => <ProjectCardItem item={item} />}
                    />
                  ) : group.layout === "designCards" ? (
                    <GalleryGroupRows
                      {...rowProps}
                      items={group.items}
                      itemKey={(item) => item.title}
                      renderItem={(item) => (
                        <DesignProjectCardItem
                          item={item}
                          aspect={group.aspect}
                        />
                      )}
                    />
                  ) : group.layout === "videos" ? (
                    <GalleryGroupRows
                      {...rowProps}
                      items={group.items}
                      itemKey={(item) => item.id}
                      renderItem={(item) => (
                        <ShortVideoCard
                          item={item}
                          aspect={group.aspect}
                          isPlaying={playingVideoId === item.id}
                          onPlay={setPlayingVideoId}
                        />
                      )}
                    />
                  ) : (
                    <GalleryGroupRows
                      {...rowProps}
                      items={group.items}
                      itemKey={(item) => item.id}
                      renderItem={(item) => (
                        <MediaTileItem item={item} aspect={group.aspect} />
                      )}
                    />
                  )}
                </div>
              );
            })}

            {/* The preview toggle exists only in the "All" tab; the other tabs simply
                show all of their items and have no button underneath. */}
            {hasPreview ? (
              <div className="mt-6 md:mt-8 flex justify-center [overflow-anchor:none]">
                <motion.button
                  type="button"
                  onClick={togglePreview}
                  aria-expanded={showAllProjects}
                  aria-controls={collapsibleIds.join(" ")}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center gap-2.5 rounded-full border border-borderSubtle bg-white px-5 py-3 font-satoshi text-[16px] leading-none text-accent transition-colors duration-200 hover:border-accent hover:bg-accent/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 [overflow-anchor:none]"
                >
                  <LayoutGrid size={18} aria-hidden="true" />
                  <span>
                    {showAllProjects
                      ? "Show less"
                      : `View all projects (${totalProjectCount})`}
                  </span>
                  {/* Plain CSS rotation so the chevron also obeys
                      prefers-reduced-motion; it follows the height animating above it. */}
                  <ChevronDown
                    size={18}
                    aria-hidden="true"
                    className={`transition-transform duration-300 ease-out motion-reduce:transition-none ${
                      showAllProjects ? "rotate-180" : ""
                    }`}
                  />
                </motion.button>
              </div>
            ) : null}
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </section>
  );
}