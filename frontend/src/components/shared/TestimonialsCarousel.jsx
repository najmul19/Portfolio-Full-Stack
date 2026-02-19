import { useEffect, useState } from 'react';
import testimonialService from '../../services/testimonialService';
import { FaQuoteLeft } from 'react-icons/fa';

const TestimonialsCarousel = () => {
    const [testimonials, setTestimonials] = useState([]);

    useEffect(() => {
        const fetchTestimonials = async () => {
            try {
                const data = await testimonialService.getAll();
                setTestimonials(data.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchTestimonials();
    }, []);

    if (testimonials.length === 0) return null;

    return (
        <section className="py-24 px-6 relative" style={{ background: 'var(--c-bg-alt)' }}>
            {/* Gradient orbs */}
            <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full blur-[140px] pointer-events-none"
                style={{ background: 'var(--c-accent-subtle)' }}
            />

            <div className="max-w-6xl mx-auto relative z-10">
                <h2 className="section-heading section-heading-center mb-16">
                    What People Say
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {testimonials.map(item => (
                        <div key={item._id} className="card p-8 h-full flex flex-col">
                            <FaQuoteLeft
                                className="text-3xl mb-6 opacity-20"
                                style={{ color: 'var(--c-accent)' }}
                            />

                            <p
                                className="text-base italic mb-8 flex-1 leading-relaxed"
                                style={{ color: 'var(--c-text-secondary)' }}
                            >
                                "{item.message}"
                            </p>

                            <div className="flex items-center gap-4 mt-auto">
                                <div
                                    className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm text-white shadow-md"
                                    style={{
                                        background: 'linear-gradient(135deg, var(--c-gradient-start), var(--c-gradient-end))'
                                    }}
                                >
                                    {item.name.charAt(0)}
                                </div>
                                <div>
                                    <h4
                                        className="font-bold text-sm"
                                        style={{ fontFamily: 'var(--font-heading)' }}
                                    >
                                        {item.name}
                                    </h4>
                                    <p
                                        className="text-xs"
                                        style={{ color: 'var(--c-text-muted)' }}
                                    >
                                        {item.role} @ {item.company}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TestimonialsCarousel;
