'use client'

import { SubserviceContentSection } from '@/components/sections';

export default function ContentSection() {
  return (
    <SubserviceContentSection>
      <p className="text-lg text-gray-600 leading-relaxed mb-6">
        Our programs for at-risk children and adolescents support those who have experienced abandonment, instability, neglect, or early adversity. We combine creative expression with trauma-informed therapeutic modalities to provide safety, emotional regulation, and gentle pathways to healing in age-appropriate, non-intrusive ways.
      </p>
      <p className="text-lg text-gray-600 leading-relaxed mb-6">
        Through expressive arts, play-based therapy, movement, storytelling, and group processes, children are supported to process experiences symbolically and safely, especially when verbal expression feels difficult. Delivered through individual sessions, small groups, and structured life-skills activities, these interventions focus on restoring agency, trust, emotional safety, and a sense of identity and self-worth, rather than revisiting trauma directly.
      </p>
      <div className="space-y-4 mb-8">
        <ul className="space-y-3 ml-6">
          <li className="flex items-start">
            <div className="w-2 h-2 bg-blue-500 rounded-full mr-3 mt-2 flex-shrink-0"></div>
            <span className="text-lg text-gray-600 leading-relaxed">Trauma-Informed Healing & Processing</span>
          </li>
          <li className="flex items-start">
            <div className="w-2 h-2 bg-blue-500 rounded-full mr-3 mt-2 flex-shrink-0"></div>
            <span className="text-lg text-gray-600 leading-relaxed">Emotional Expression & Regulation</span>
          </li>
          <li className="flex items-start">
            <div className="w-2 h-2 bg-blue-500 rounded-full mr-3 mt-2 flex-shrink-0"></div>
            <span className="text-lg text-gray-600 leading-relaxed">Social Skills & Relationship Building</span>
          </li>
          <li className="flex items-start">
            <div className="w-2 h-2 bg-blue-500 rounded-full mr-3 mt-2 flex-shrink-0"></div>
            <span className="text-lg text-gray-600 leading-relaxed">Identity Development & Self-Worth</span>
          </li>
        </ul>
      </div>
    </SubserviceContentSection>
  );
}
