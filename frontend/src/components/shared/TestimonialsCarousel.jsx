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
        <section className="container mx-auto px-6 py-16 bg-gray-900/50">
            <h2 className="text-3xl font-bold text-accent mb-10 text-center">What People Say</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {testimonials.map(item => (
                    <div key={item._id} className="bg-secondary p-8 rounded-xl relative">
                        <FaQuoteLeft className="text-4xl text-gray-700 absolute top-4 left-4 opacity-50" />
                        <p className="text-gray-300 italic mb-6 relative z-10 pt-4">"{item.message}"</p>
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center text-primary font-bold">
                                {item.name.charAt(0)}
                            </div>
                            <div>
                                <h4 className="font-bold text-white text-sm">{item.name}</h4>
                                <p className="text-xs text-gray-400">{item.role} @ {item.company}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default TestimonialsCarousel;
