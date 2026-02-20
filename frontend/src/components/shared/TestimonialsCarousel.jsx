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
        <section className="">
            <div className="">
                <h2 className="section-heading mb-16">
                    What People Say
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {testimonials.map((item, idx) => (
                        <div
                            key={item._id}
                            className="card p-10 h-full flex flex-col hover:border-white/10 transition-all duration-300"
                            data-aos="fade-up"
                            data-aos-delay={idx * 150}
                        >
                            <FaQuoteLeft
                                className="text-4xl mb-8 opacity-10 text-[var(--c-accent)]"
                            />

                            <p className="text-lg italic mb-10 flex-1 leading-relaxed text-[#94a3b8]">
                                "{item.message}"
                            </p>

                            <div className="flex items-center gap-5 mt-auto">
                                <div
                                    className="w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-base text-white shadow-xl bg-gradient-to-br from-[var(--c-accent)] to-[#6366f1]"
                                >
                                    {item.name.charAt(0)}
                                </div>
                                <div>
                                    <h4
                                        className="font-bold text-lg text-white"
                                        style={{ fontFamily: 'var(--font-heading)' }}
                                    >
                                        {item.name}
                                    </h4>
                                    <p className="text-sm text-[#64748b]">
                                        {item.role} <span className="opacity-30 mx-1">/</span> {item.company}
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
