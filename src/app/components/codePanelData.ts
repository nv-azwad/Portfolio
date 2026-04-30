import type { CodeLine } from "./CodePanel";

const k = (value: string): { kind: "keyword"; value: string } => ({ kind: "keyword", value });
const s = (value: string): { kind: "string"; value: string } => ({ kind: "string", value });
const c = (value: string): { kind: "comment"; value: string } => ({ kind: "comment", value });
const f = (value: string): { kind: "function"; value: string } => ({ kind: "function", value });
const t = (value: string): { kind: "type"; value: string } => ({ kind: "type", value });
const n = (value: string): { kind: "number"; value: string } => ({ kind: "number", value });
const o = (value: string): { kind: "operator"; value: string } => ({ kind: "operator", value });
const p = (value: string): { kind: "punct"; value: string } => ({ kind: "punct", value });
const x = (value: string): { kind: "plain"; value: string } => ({ kind: "plain", value });

/** AI Engineering Portfolio — LangChain + Ollama multi-agent */
export const aiPortfolioCode: CodeLine[] = [
  { tokens: [c("// hierarchical multi-agent system")] },
  { tokens: [k("import"), x(" { "), t("ChatOllama"), x(" } "), k("from"), x(" "), s("\"@langchain/ollama\"")] },
  { tokens: [k("import"), x(" { "), t("RAGChain"), x(" } "), k("from"), x(" "), s("\"./rag\"")] },
  { text: "" },
  {
    tokens: [
      k("const"),
      x(" "),
      f("manager"),
      x(" "),
      o("="),
      x(" "),
      k("new"),
      x(" "),
      t("Manager"),
      p("({"),
    ],
  },
  { tokens: [x("  workers: ["), f("coder"), p(","), x(" "), f("researcher"), p(","), x(" "), f("writer"), x("],")] },
  { tokens: [x("  routing: "), s("\"dynamic\""), p(",")] },
  { tokens: [x("  llm: "), k("new"), x(" "), t("ChatOllama"), p("({"), x(" model: "), s("\"llama3.1\""), x(" "), p("}),")] },
  { tokens: [p("})")] },
  { text: "" },
  {
    tokens: [
      k("const"),
      x(" "),
      f("answer"),
      x(" "),
      o("="),
      x(" "),
      k("await"),
      x(" "),
      f("manager"),
      p("."),
      f("route"),
      p("("),
      f("query"),
      p(")"),
    ],
  },
];

/** UAV FANET FYP — Python NS3 + reinforcement learning */
export const uavFypCode: CodeLine[] = [
  { tokens: [c("# UAV FANET — RL-driven mobility")] },
  { tokens: [k("from"), x(" ns3 "), k("import"), x(" "), t("MobilityModel"), p(","), x(" "), t("ThzChannel")] },
  { tokens: [k("from"), x(" rl "), k("import"), x(" "), t("PPO")] },
  { text: "" },
  { tokens: [f("agent"), x(" "), o("="), x(" "), t("PPO"), p("("), x("env"), o("="), f("FANETEnv"), p("("), s("\"thz\""), p("),"), x(" "), x("policy"), o("="), s("\"MlpPolicy\""), p(")")] },
  { text: "" },
  { tokens: [k("for"), x(" "), x("episode "), k("in"), x(" "), f("range"), p("("), n("5000"), p("):")] },
  { tokens: [x("    obs "), o("="), x(" "), x("env"), p("."), f("reset"), p("()")] },
  { tokens: [x("    "), x("action "), o("="), x(" "), x("agent"), p("."), f("predict"), p("("), x("obs"), p(")")] },
  { tokens: [x("    "), x("obs"), p(","), x(" "), x("reward"), p(","), x(" "), x("done "), o("="), x(" "), x("env"), p("."), f("step"), p("("), x("action"), p(")")] },
  { text: "" },
  { tokens: [c("# converged: throughput +38%, latency -22%")] },
];
