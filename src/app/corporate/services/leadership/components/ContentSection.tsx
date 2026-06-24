'use client'

import { SubserviceContentSection } from '@/components/sections';

export default function ContentSection() {
  return (
    <SubserviceContentSection>
      <p className="text-lg text-gray-600 leading-relaxed mb-6">
        Leadership today is less about authority and more about how managers think, communicate, decide, and show up with people every day. Yet many leaders are promoted for technical ability and left to figure out the human side of leadership on their own.
      </p>
      <p className="text-lg text-gray-600 leading-relaxed mb-6">
        Our leadership development programs are designed to close that gap. We focus on practical, observable skills that managers and teams can apply immediately at work. From everyday conversations and feedback to decision-making under pressure, influence, and presence, learning is grounded in real situations leaders face, not abstract theory.
      </p>
      <div className="space-y-4 mb-8">
        <p className="text-lg text-gray-600 leading-relaxed">
          Through hands-on practice, structured reflection, and workplace-relevant tools, participants build:
        </p>
        <ul className="space-y-3 ml-6">
          <li className="flex items-start">
            <div className="w-2 h-2 bg-blue-500 rounded-full mr-3 mt-2 flex-shrink-0"></div>
            <span className="text-lg text-gray-600 leading-relaxed">Clarity, confidence, and consistency in how they lead</span>
          </li>
          <li className="flex items-start">
            <div className="w-2 h-2 bg-blue-500 rounded-full mr-3 mt-2 flex-shrink-0"></div>
            <span className="text-lg text-gray-600 leading-relaxed">Leadership that shows up in behaviour and strengthens teams</span>
          </li>
          <li className="flex items-start">
            <div className="w-2 h-2 bg-blue-500 rounded-full mr-3 mt-2 flex-shrink-0"></div>
            <span className="text-lg text-gray-600 leading-relaxed">Measurable impact across performance, engagement, and retention</span>
          </li>
        </ul>
      </div>
    </SubserviceContentSection>
  );
}
