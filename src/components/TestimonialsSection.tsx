import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import { ParticlesBackground } from './ParticlesBackground';

const testimonials = [
  {
    name: "Sarah K.",
    text: "Haven Style has the best selection! The quality is top-notch and delivery was super fast.",
    rating: 5,
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah"
  },
  {
    name: "Michael O.",
    text: "Love the variety of products. Customer service is excellent and prices are unbeatable!",
    rating: 5,
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael"
  },
  {
    name: "Jane M.",
    text: "My go-to store for fashion. Always find exactly what I'm looking for. Highly recommend!",
    rating: 5,
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jane"
  },
  {
    name: "David N.",
    text: "Amazing experience from start to finish. The products exceeded my expectations!",
    rating: 5,
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=David"
  },
  {
    name: "Lucy W.",
    text: "Fast delivery, great prices, and stylish products. What more could you ask for?",
    rating: 5,
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Lucy"
  }
];

export const TestimonialsSection = () => {
  return (
    <section className="relative py-20 overflow-hidden bg-gradient-to-br from-primary via-secondary to-accent">
      <ParticlesBackground />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-4">
            Trusted by Streetwear Lovers
          </h2>
          <p className="text-xl text-primary-foreground/80">
            Join thousands of satisfied customers
          </p>
        </motion.div>

        <div className="relative">
          <div className="flex gap-6 overflow-x-auto pb-6 snap-x snap-mandatory scrollbar-hide">
            {[...testimonials, ...testimonials].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8, scale: 1.05 }}
                className="flex-shrink-0 w-[350px] snap-center"
              >
                <div className="bg-card/90 backdrop-blur-md rounded-2xl p-6 border border-border shadow-xl hover:shadow-2xl transition-all duration-300 h-full">
                  <Quote className="w-8 h-8 text-primary mb-4" />
                  
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-accent text-accent" />
                    ))}
                  </div>
                  
                  <p className="text-foreground mb-6 text-lg leading-relaxed">
                    "{testimonial.text}"
                  </p>
                  
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-primary">
                      <img 
                        src={testimonial.image} 
                        alt={testimonial.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">Verified Customer</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-8"
        >
          <p className="text-primary-foreground/90 text-lg">
            Over <span className="font-bold text-accent">10,000+</span> Happy Customers
          </p>
        </motion.div>
      </div>
    </section>
  );
};
