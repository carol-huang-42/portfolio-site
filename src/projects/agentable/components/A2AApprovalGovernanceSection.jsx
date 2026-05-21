import ApprovalDeterministicLoopBlock from "./ApprovalDeterministicLoopBlock.jsx";
import MultiviewAdaptationPanel from "./MultiviewAdaptationPanel.jsx";

/**
 * @param {{ lang: 'zh' | 'en' }} props
 */
export default function A2AApprovalGovernanceSection({ lang }) {
  return (
    <section
      id="agentable-approval-scenarios"
      className="mt-14 rounded-[20px] border-[0.5px] border-slate-200/50 bg-white/40 px-5 py-10 shadow-[inset_0_1px_0_rgba(255,255,255,0.88)] backdrop-blur-xl md:mt-20 md:px-10 md:py-12"
    >
      <ApprovalDeterministicLoopBlock lang={lang} />
      <MultiviewAdaptationPanel lang={lang} />
    </section>
  );
}
