import SectionHeading from '@/components/sections/SectionHeading'

export default function TherapeuticFocusAreas() {
  return (
    <section className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <SectionHeading
            level="subservice"

            title="Therapeutic Focus Areas"
          />
        </div>
        
        <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mr-4">
                <span className="text-white text-xl">🧠</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 font-bricolage-display">Trauma Processing & Attachment Repair</h3>
            </div>
            <p className="text-gray-600 leading-relaxed font-bricolage-text">
              Supporting the safe processing of trauma histories, disrupted attachments, and survival-based behavioural patterns.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center mr-4">
                <span className="text-white text-xl">💚</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 font-bricolage-display">Self-Worth, Accountability & Empathy Development</h3>
            </div>
            <p className="text-gray-600 leading-relaxed font-bricolage-text">
              Rebuilding a positive sense of self while developing responsibility, perspective-taking, and empathy toward others.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center mr-4">
                <span className="text-white text-xl">🎯</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 font-bricolage-display">Emotional Regulation & Healthy Expression</h3>
            </div>
            <p className="text-gray-600 leading-relaxed font-bricolage-text">
              Strengthening awareness, regulation, and constructive expression of intense emotions such as anger, fear, or shame.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center mr-4">
                <span className="text-white text-xl">🌟</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 font-bricolage-display">Decision-Making & Consequence Awareness</h3>
            </div>
            <p className="text-gray-600 leading-relaxed font-bricolage-text">
              Developing thoughtful decision-making skills, impulse control, and understanding of consequences in real-life situations.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-pink-500 rounded-lg flex items-center justify-center mr-4">
                <span className="text-white text-xl">🤝</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 font-bricolage-display">Identity Exploration & Skill-Building</h3>
            </div>
            <p className="text-gray-600 leading-relaxed font-bricolage-text">
              Providing non-judgmental spaces for exploring identity, strengths, and future roles while building practical life and social skills.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-indigo-500 rounded-lg flex items-center justify-center mr-4">
                <span className="text-white text-xl">🌐</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 font-bricolage-display">Social Connection, Cooperation & Contribution</h3>
            </div>
            <p className="text-gray-600 leading-relaxed font-bricolage-text">
              Fostering trust, teamwork, and a sense of contribution through collaborative group processes and shared responsibility.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
