import SectionHeading from '@/components/sections/SectionHeading'

export default function TherapeuticGoals() {
  return (
    <section className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <SectionHeading
            level="subservice"

            subtitle="Our specialized programs are designed to address the unique needs of children with special needs through evidence-based therapeutic approaches"
          >
            <span className="text-[#0047AB]">Therapeutic</span> Goals
          </SectionHeading>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mr-4">
                <span className="text-white text-xl">🧠</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 font-bricolage-display">Sensory Integration</h3>
            </div>
            <p className="text-gray-600 leading-relaxed">
              Enhance sensory integration and body awareness through specialized activities that help children process and respond to sensory information effectively.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center mr-4">
                <span className="text-white text-xl">💚</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 font-bricolage-display">Emotional Regulation</h3>
            </div>
            <p className="text-gray-600 leading-relaxed font-bricolage-text">
              Improve emotional regulation and self-expression through creative arts and therapeutic activities that provide safe outlets for emotional processing.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center mr-4">
                <span className="text-white text-xl">🎯</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 font-bricolage-display">Attention & Control</h3>
            </div>
            <p className="text-gray-600 leading-relaxed font-bricolage-text">
              Support attention span, turn-taking, and impulse control through structured activities and games that build these essential life skills.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center mr-4">
                <span className="text-white text-xl">🤝</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 font-bricolage-display">Social Skills</h3>
            </div>
            <p className="text-gray-600 leading-relaxed font-bricolage-text">
              Build communication, social skills, and empathy through group activities and peer interaction opportunities in supportive environments.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-pink-500 rounded-lg flex items-center justify-center mr-4">
                <span className="text-white text-xl">🎨</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 font-bricolage-display">Creativity & Confidence</h3>
            </div>
            <p className="text-gray-600 leading-relaxed font-bricolage-text">
              Foster creativity, confidence, and a sense of safety through artistic expression and creative exploration in nurturing, non-judgmental spaces.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-teal-500 rounded-lg flex items-center justify-center mr-4">
                <span className="text-white text-xl">🏠</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 font-bricolage-display">Routine & Trust</h3>
            </div>
            <p className="text-gray-600 leading-relaxed font-bricolage-text">
              Facilitate routine-building, predictability, and relational trust through consistent, structured activities that provide security and stability.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
