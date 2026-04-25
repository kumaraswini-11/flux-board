import { Project } from "@/components/sidebar/nav-projects";
import { Workspace } from "@/components/sidebar/workspace-switcher";

export const sampleWorkspaces: Workspace[] = [
  { id: "ws_mkt_001", name: "Acme Inc.", plan: "Pro", image:"https://www.stockvault.net/data/2016/03/08/186269/thumb16.jpg" },
  { id: "ws_mkt_002", name: "Marketing Hub", plan: "Free", image:"https://www.stockvault.net/data/2019/03/06/261776/thumb16.jpg" },
  { id: "ws_dev_003", name: "Dev Workspace", plan: "Enterprise", image:"https://www.stockvault.net/data/2019/08/31/269064/thumb16.jpg" },
  { id: "ws_sales_004", name: "Sales Ops", plan: "Free" },
  { id: "ws_sales_005", name: "Sample WS 5", plan: "Pro", image:"https://www.stockvault.net/data/2019/12/30/272195/thumb16.jpg" },
];


export const sampleProjects: Project[] = [
  {
    id: "prj_001",
    workspace_id: "ws_mkt_001",
    name: "Website Redesign",
    href: "/projects/website",
    status: "active",
  },
  {
    id: "prj_002",
    workspace_id: "ws_mkt_001",
    name: "Social Campaign Q4",
    href: "/projects/social-q4",
    status: "planning",
  },
  {
    id: "prj_003",
    workspace_id: "ws_dev_003",
    name: "Mobile App Backend",
    href: "/projects/mobile-app",
    status: "active",
  },
  {
    id: "prj_004",
    workspace_id: "ws_dev_003",
    name: "API Documentation",
    href: "/projects/api-docs",
    status: "complete",
  },
  {
    id: "prj_005",
    workspace_id: "ws_sales_004",
    name: "Lead Scoring System",
    href: "/projects/lead-scoring",
    status: "active",
  },
  {
    id: "prj_006",
    workspace_id: "ws_mkt_002",
    name: "Sales Campaign Q4",
    href: "/projects/sales-campaign-q4",
    status: "active",
  },
  {
    id: "prj_007",
    workspace_id: "ws_mkt_001",
    name: "Sales Campaign Q5",
    href: "/projects/sales-campaign-q5",
    status: "active",
  },
  {
    id: "prj_008",
    workspace_id: "ws_mkt_002",
    name: "Sales Campaign Q6",
    href: "/projects/sales-campaign-q6",
    status: "active",
  },
  {
    id: "prj_009",
    workspace_id: "ws_sales_005",
    name: "Sales Campaign Q7",
    href: "/projects/sales-campaign-q7",
    status: "active",
  },
  {
    id: "prj_010",
    workspace_id: "ws_mkt_002",
    name: "Sales Campaign Q8",
    href: "/projects/sales-campaign-q8",
    status: "active",
  },
  {
    id: "prj_011",
    workspace_id: "ws_sales_005",
    name: "Sales Campaign Q9",
    href: "/projects/sales-campaign-q9",
    status: "active",
  },
  {
    id: "prj_012",
    workspace_id: "ws_sales_004",
    name: "Sales Campaign Q10",
    href: "/projects/sales-campaign-q10",
    status: "active",
  },
];