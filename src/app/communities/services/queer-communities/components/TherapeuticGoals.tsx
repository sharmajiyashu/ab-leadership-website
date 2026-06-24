import SectionHeading from '@/components/sections/SectionHeading'

export default function TherapeuticGoals() {
  return (
    <section className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <SectionHeading
            level="subservice"

            subtitle="Our specialized programs are designed to address the unique needs of queer individuals through evidence-based, queer-affirmative therapeutic approaches"
          >
            <span className="text-[#0047AB]">Therapeutic</span> Goals
          </SectionHeading>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center mr-4">
                <span className="text-white text-xl">🏳️‍🌈</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 font-bricolage-display">Support Safe Identity Exploration and Affirmation</h3>
            </div>
            <p className="text-gray-600 leading-relaxed font-bricolage-text">
              Create affirming spaces where individuals can explore, express, and integrate their gender, sexuality, and lived experiences without judgment.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mr-4">
                <span className="text-white text-xl">💙</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 font-bricolage-display">Address Trauma and Minority Stress</h3>
            </div>
            <p className="text-gray-600 leading-relaxed font-bricolage-text">
              Support healing from stigma, rejection, discrimination, and internalised oppression using trauma-informed creative and embodied modalities.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center mr-4">
                <span className="text-white text-xl">💪</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 font-bricolage-display">Strengthen Body Autonomy and Self-Connection</h3>
            </div>
            <p className="text-gray-600 leading-relaxed font-bricolage-text">
              Foster positive relationships with the body, boundaries, and self-worth through body-affirming and somatic practices.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center mr-4">
                <span className="text-white text-xl">🌟</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 font-bricolage-display">Rebuild Internal Narratives Toward Agency and Pride</h3>
            </div>
            <p className="text-gray-600 leading-relaxed font-bricolage-text">
              Help individuals re-author personal narratives from shame or invisibility toward self-acceptance, joy, and empowerment.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-pink-500 rounded-lg flex items-center justify-center mr-4">
                <span className="text-white text-xl">🤝</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 font-bricolage-display">Cultivate Community Belonging and Chosen Family</h3>
            </div>
            <p className="text-gray-600 leading-relaxed font-bricolage-text">
              Build supportive peer connections and a sense of belonging through group processes and shared creative experiences.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-teal-500 rounded-lg flex items-center justify-center mr-4">
                <span className="text-white text-xl">⚡</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 font-bricolage-display">Develop Resilience, Voice, and Self-Advocacy</h3>
            </div>
            <p className="text-gray-600 leading-relaxed font-bricolage-text">
              Strengthen emotional resilience, confidence, and the ability to self-advocate in personal, social, and institutional contexts.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
