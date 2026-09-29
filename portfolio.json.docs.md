# Portfolio content reference

This guide documents [src/data/portfolio.json](src/data/portfolio.json) against the current components. Use it when editing content or changing the schema.

## How the content reaches the site

- [src/types/portfolio.ts](src/types/portfolio.ts) defines the expected TypeScript shape.
- [src/lib/portfolio.ts](src/lib/portfolio.ts) imports the JSON and exposes `portfolio`, `getProjects()`, and `getWork()`.
- Components read from that module. Do not add direct JSON imports to individual components.
- The JSON is bundled with the application. Production content changes require a rebuild and deployment; hourly GitHub revalidation does not reload edited JSON from disk.
- The content module provides compile-time type checking, not runtime validation of URLs, dates, or unique IDs.

## Editing rules

- Save as UTF-8. Emojis can be pasted directly inside strings.
- Use double quotes, no comments, and no trailing commas.
- Use `null` without quotes for an intentionally absent value. `"null"` is text.
- A nullable field is still required unless this guide explicitly says it can be omitted.
- Use `\n` for a newline inside a string and `\n\n` for a blank line. Literal line breaks inside a JSON string are invalid.
- Text renders as plain text, not Markdown or HTML. The home-page summary preserves line breaks; most other descriptions collapse whitespace.
- Local links start at the public URL: `/resume.pdf` refers to `public/resume.pdf`, not `/public/resume.pdf`.
- Use full HTTPS URLs for external websites and repositories. Do not store secrets or private content here.

## Site settings: `site`

| Field | Type | Current behavior |
| --- | --- | --- |
| `name` | string | Navbar brand name, accessible home-link label, footer name, and default browser title. Other page titles use the template `Page title \| name`. |
| `description` | string | HTML metadata description. Not displayed as the home-page introduction. |
| `resumeUrl` | string or null | Home-page resume link. Use a local file path or external URL. `null` hides it. Opens in a new tab. |

The logo and favicon paths are configured in components/metadata, not in this object.

## Navigation: `navigation[]`

| Field | Type | Current behavior |
| --- | --- | --- |
| `label` | string | Visible navigation text. |
| `href` | string | Link destination, such as `/` or `/work`. Used for active-page matching. |

Array order controls link order. The navbar uses the same data for desktop and mobile navigation. Adding a record does not create a route; the destination must already exist. Keep destinations unique.

## Home introduction: `profile`

| Field | Type | Current behavior |
| --- | --- | --- |
| `name` | string | Large home-page heading. Independent from `site.name`. |
| `role` | string | Green role text below the name. |
| `summary` | string | Introductory paragraph. Preserves `\n` line breaks and `\n\n` paragraph spacing through `whitespace-pre-line`. |
| `company` | string or null | Currently unused by the UI. Retained in the JSON and type; changing it has no visible effect. |
| `availability` | string or null | Currently unused by the UI. The earlier status-dot row is no longer rendered. |

Do not assume `company` or `availability` renders merely because the field exists. If removing or reconnecting either field, update this guide and the types together.

## Navbar clock: `clock`

| Field | Type | Current behavior |
| --- | --- | --- |
| `timeZone` | string | Valid IANA time-zone identifier passed to `Intl.DateTimeFormat`, e.g. `Asia/Colombo`. |
| `label` | string | Short visible location label, e.g. `LK`, also used in the mobile time label. |

The current clock updates every second and uses 12-hour time with uppercase AM/PM. The time format is defined in the component, not the JSON.

## GitHub activity: `github`

| Field | Type | Current behavior |
| --- | --- | --- |
| `username` | string | GitHub account name only, without `@` or a URL. Drives the contribution request, home intro GitHub link, and calendar GitHub link. |
| `heading` | string | Contribution section heading, including its loading state. |

The server requests `https://github-contributions-api.jogruber.de/v4/{username}?y=last`. Successful fetches are cached with a 3,600-second revalidation interval, not a browser polling timer. Requests time out after eight seconds. An unavailable message replaces the chart if the request or response validation fails.

The chart uses real daily counts and levels. Do not add dummy contribution counts to this file. The footer GitHub URL is separately configured in `socials`; update it too if changing accounts.

## Section copy: `sections`

All fields below are strings.

| Field | Current behavior |
| --- | --- |
| `skillsTitle` | Home-page skills section heading. |
| `workTitle` | Project section heading on both Home and Work. Despite the name, this controls project cards, not employment history. |
| `workDescription` | Introductory paragraph below the Work page's main heading. |
| `experienceTitle` | Employment/freelance experience section heading on Work. |
| `contactTitle` | Contact section heading on both pages. |
| `contactDescription` | Contact section paragraph on both pages. |
| `footer` | Small footer message. The separate copyright text/date is currently defined in the component. |

## Contact and social links

| Field | Type | Current behavior |
| --- | --- | --- |
| `contact.email` | string | Email address only, without `mailto:`. Used for the home intro email link and visible contact email; components add `mailto:`. |
| `socials[].label` | string | Social-link text. Rendered in lowercase and used as the React list key, so labels should be unique. |
| `socials[].url` | string | Destination URL. Social links open in a new tab. |

Social links appear in array order. Add/remove entries to add/remove footer links. An empty `socials` array removes the social-link list, but not the email link.

## Shared work/project fields

Each `work[]` and `projects[]` item has these fields:

| Field | Type | Current behavior |
| --- | --- | --- |
| `id` | string | Stable React list key. Must be unique within its collection. Preserve it when renaming an item. Work and projects can use the same ID because they are separate lists. |
| `order` | number | Ascending display order: smaller values appear first. Use distinct numbers for predictable ordering. |
| `published` | boolean | Only `true` items are returned by the content selectors. `false` hides the record from rendered lists. |

Publication is a display filter, not an access-control mechanism: the underlying JSON can be bundled into the application. Do not use unpublished records to store confidential information.

## Experience records: `work[]`

These records appear on the Work page.

| Field | Type | Current behavior |
| --- | --- | --- |
| `company` | string | Employer, client, or business name. |
| `role` | string | Position or role heading. |
| `startDate` | string | Start date in `YYYY-MM-DD` format. Currently only the first four characters (year) are displayed. |
| `endDate` | string or null | End date in the same format. `null` displays `Present`. |
| `description` | string | Summary below the role and company. |
| `url` | optional string or null | Makes the company name a link that opens in a new tab. Omit it or set it to `null` to render plain company text. |

Work records currently do **not** have a `slug` field in the schema or a rendered anchor. Project slugs are described below.

Example shape (replace sample values with real content):

```json
{
  "id": "work-example",
  "order": 2,
  "published": false,
  "company": "Example Studio",
  "role": "Software Engineer",
  "startDate": "2025-01-01",
  "endDate": null,
  "description": "Describe your responsibilities here.",
  "url": null
}
```

## Project records: `projects[]`

Home displays the first **three published projects** after sorting by `order`. Work displays all published projects. There is no separate featured flag.

| Field | Type | Current behavior |
| --- | --- | --- |
| `slug` | string | Unique HTML anchor ID for the card, e.g. `partlens` gives `/work#partlens`. Does not create a detail page. Prefer lowercase, hyphen-separated values for new records. Existing mixed-case slugs are used exactly as written. |
| `name` | string | Card title and accessible link names. |
| `description` | string | Project description below the title. |
| `tags` | string array | Technology badges in array order. Use unique labels within each project. An empty array produces no badges. |
| `year` | string | Display year beside the title, e.g. `"2026"`. Stored as text, not a number or full date. |
| `url` | string or null | Live website URL. Displays `Visit site`; `null` hides the link. |
| `repoUrl` | optional string or null | Repository URL. Displays `Repository`; omitted or `null` hides the link. |

Site and repository links are independent and open in new tabs. If both are absent, the entire link row is omitted. Keep `url` present with `null` when no public site exists; only `repoUrl` is optional in the type.

Example shape:

```json
{
  "id": "project-example",
  "slug": "example-project",
  "order": 6,
  "published": false,
  "name": "Example Project",
  "description": "Describe the project here.",
  "tags": ["TypeScript", "Next.js"],
  "year": "2026",
  "url": null,
  "repoUrl": null
}
```

## Skills: `skills[]`

An array of strings rendered as home-page skill badges, in array order. Add or remove strings to edit the list. Keep labels unique because each label is also used as its list key. An empty array removes the badges but leaves the section heading.

## Common edits

- **Change the name everywhere:** edit both `site.name` and `profile.name`.
- **Replace the resume:** update `public/resume.pdf`, or change `site.resumeUrl` to the new file URL.
- **Add paragraph breaks:** use a value like `"First paragraph.\n\nSecond paragraph."` for `profile.summary`.
- **Add an emoji:** use ordinary text, such as `"Made with 🧠"`.
- **Hide a project or job:** set its `published` to `false`.
- **Promote a project onto Home:** give it an `order` that places it among the first three published projects.
- **Add a company link:** add `"url": "https://example.com"` to that work record.
- **Change a project anchor:** edit `slug` and update any existing inbound links that you control. Do not change established slugs just to normalize capitalization.

## Implementation map and maintenance

| Source | Responsibility |
| --- | --- |
| [src/types/portfolio.ts](src/types/portfolio.ts) | Types, required fields, and nullability. |
| [src/lib/portfolio.ts](src/lib/portfolio.ts) | Single JSON import, publication filtering, ordering. |
| [src/app/layout.tsx](src/app/layout.tsx) | Site metadata. |
| [src/app/page.tsx](src/app/page.tsx) | Intro, summary line breaks, hero links, contribution loading, skills, project preview. |
| [src/app/work/page.tsx](src/app/work/page.tsx) | Work introduction and combined experience/project page. |
| [src/components/navbar.tsx](src/components/navbar.tsx) | Brand and desktop/mobile navigation. |
| [src/components/local-clock.tsx](src/components/local-clock.tsx) | Clock formatting and updates. |
| [src/lib/github.ts](src/lib/github.ts) | Contribution fetch, cache settings, response validation. |
| [src/components/sections/contributions.tsx](src/components/sections/contributions.tsx) | Contribution calendar and fallback rendering. |
| [src/components/sections/projects.tsx](src/components/sections/projects.tsx) | Project cards, preview limit, optional links, anchors. |
| [src/components/sections/experience.tsx](src/components/sections/experience.tsx) | Work records, date labels, optional company links. |
| [src/components/sections/contact.tsx](src/components/sections/contact.tsx) | Email, socials, and footer. |

When changing a field or its behavior, update the JSON, TypeScript type, consuming code, and this guide together as applicable. Check references in the implementation rather than relying on earlier conversation descriptions. In particular, distinguish fields retained in the schema from fields actually rendered.

Before shipping content changes, check JSON syntax, required fields, unique IDs/slugs, local asset paths, and published records. For code/schema changes, also run `npm run lint` and `npm run build`.
