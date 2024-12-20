import { writable } from 'svelte/store';

export const editorContent = writable(`# Welcome to Evidence

Evidence is an open source framework for building data products with SQL - things like reports, decision-support tools, and embedded dashboards. It's a code-driven alternative to drag-and-drop BI tools.

\`\`\`sql revenue_by_category
select 'Electronics' as category, 125000 as revenue union all
select 'Clothing' as category, 98000 as revenue union all
select 'Books' as category, 45000 as revenue union all
select 'Home' as category, 78000 as revenue union all
select 'Food' as category, 112000 as revenue
order by revenue desc
\`\`\`

{revenue_by_category:bar}

## What's Next?
- Write your own queries
- Edit/add markdown files in the \`pages\` folder
- Deploy your project with [Evidence Cloud](https://evidence.dev/cloud)

## Get Support
- Message us on [Slack](https://slack.evidence.dev/)
- Read the [Docs](https://docs.evidence.dev/)
- Open an issue on [Github](https://github.com/evidence-dev/evidence)
`);