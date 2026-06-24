import SectionHeading from '@/components/sections/SectionHeading'

export default function TherapeuticGoals() {
  return (
    <section className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <SectionHeading
            level="subservice"

            subtitle="Our specialized programs are designed to address the unique needs of at-risk children and adolescents through evidence-based therapeutic approaches"
          >
            <span className="text-[#0047AB]">Therapeutic</span> Goals
          </SectionHeading>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mr-4">
                <span className="text-white text-xl">🏠</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 font-bricolage-display">Establish Safety and Trust</h3>
            </div>
            <p className="text-gray-600 leading-relaxed font-bricolage-text">
              Create predictable, nurturing environments that help children feel emotionally and physically safe, enabling healthy relational connection.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center mr-4">
                <span className="text-white text-xl">💚</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 font-bricolage-display">Support Emotional Expression and Regulation</h3>
            </div>
            <p className="text-gray-600 leading-relaxed font-bricolage-text">
              Help children recognise, express, and regulate emotions through creative, non-verbal, and age-appropriate modalities.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center mr-4">
                <span className="text-white text-xl">🎨</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 font-bricolage-display">Restore a Sense of Agency and Choice</h3>
            </div>
            <p className="text-gray-600 leading-relaxed font-bricolage-text">
              Encourage autonomy and decision-making to rebuild a child&apos;s sense of control, voice, and personal power.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center mr-4">
                <span className="text-white text-xl">🤝</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 font-bricolage-display">Strengthen Identity and Self-Worth</h3>
            </div>
            <p className="text-gray-600 leading-relaxed font-bricolage-text">
              Support positive identity formation and self-esteem by affirming strengths, individuality, and personal narratives.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-pink-500 rounded-lg flex items-center justify-center mr-4">
                <span className="text-white text-xl">🌟</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 font-bricolage-display">Build Social and Relational Skills</h3>
            </div>
            <p className="text-gray-600 leading-relaxed font-bricolage-text">
              Develop empathy, cooperation, and healthy peer relationships through guided group experiences and shared creative processes.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-indigo-500 rounded-lg flex items-center justify-center mr-4">
                <span className="text-white text-xl">🌱</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 font-bricolage-display">Foster Resilience and Hope</h3>
            </div>
            <p className="text-gray-600 leading-relaxed font-bricolage-text">
              Encourage adaptive coping, emotional resilience, and a future-oriented sense of possibility through storytelling and reflective practices.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
