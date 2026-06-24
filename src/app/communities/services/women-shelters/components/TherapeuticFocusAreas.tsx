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
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center mr-4">
                <span className="text-white text-xl">🛡️</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 font-bricolage-display">Safety, Agency, and Choice</h3>
            </div>
            <p className="text-gray-600 leading-relaxed">
              Restoring a sense of physical and emotional safety while supporting autonomy, consent, and personal decision-making.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-red-500 rounded-lg flex items-center justify-center mr-4">
                <span className="text-white text-xl">💙</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 font-bricolage-display">Trauma Processing and Emotional Integration</h3>
            </div>
            <p className="text-gray-600 leading-relaxed">
              Supporting the gentle processing of trauma, grief, and chronic threat through non-intrusive, creative, and body-based modalities.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-teal-500 rounded-lg flex items-center justify-center mr-4">
                <span className="text-white text-xl">🧘</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 font-bricolage-display">Body Reconnection and Somatic Regulation</h3>
            </div>
            <p className="text-gray-600 leading-relaxed">
              Rebuilding a safe relationship with the body through grounding, movement, and nervous system regulation practices.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center mr-4">
                <span className="text-white text-xl">💬</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 font-bricolage-display">Voice, Expression, and Boundary Setting</h3>
            </div>
            <p className="text-gray-600 leading-relaxed">
              Strengthening self-expression, assertive communication, and the ability to name needs and boundaries.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-pink-500 rounded-lg flex items-center justify-center mr-4">
                <span className="text-white text-xl">💪</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 font-bricolage-display">Self-Worth and Empowerment</h3>
            </div>
            <p className="text-gray-600 leading-relaxed">
              Reclaiming confidence, dignity, and personal power through affirming creative and therapeutic processes.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-indigo-500 rounded-lg flex items-center justify-center mr-4">
                <span className="text-white text-xl">🤝</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 font-bricolage-display">Relational Healing and Support Networks</h3>
            </div>
            <p className="text-gray-600 leading-relaxed">
              Fostering trust, connection, and mutual support through group work, peer circles, and community-based healing spaces.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
