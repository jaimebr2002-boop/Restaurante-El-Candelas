import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Phone, 
  MapPin, 
  Star, 
  ChevronRight, 
  ChevronLeft,
  UtensilsCrossed, 
  Clock,
  ExternalLink,
  Quote,
  Mail
} from "lucide-react";

const REVIEWS_DATA = [
  {
    name: "Salvador Gómez",
    rating: 5,
    text: "“Menú de cocido excelente. Gran producto con la posibilidad de repetir. Personal súper amable y en un espacio muy bonito y acogedor. Fenomenal.”"
  },
  {
    name: "Carlos Bellvis",
    rating: 5,
    text: "“Comimos cocido, espectacular y trato excelente! Más que recomendable, tienen comida de temporada y con gran fama en la ciudad. Muchas gracias!”"
  },
  {
    name: "Javier Serrano Palos",
    rating: 5,
    text: "“Hemos tenido una comida familiar de 13 personas y ha sido todo un descubrimiento porque no lo conocíamos. Lugar acogedor en el que se come comida deliciosa como si estuvieras en casa de tu madre o abuela a un precio competitivo y con buena cantidad. Muy buen servicio, atentos, amables y agilidad. Repetiremos sin duda. ¡Muchas gracias!”"
  },
  {
    name: "Mariángeles Ruiz",
    rating: 5,
    text: "“Famoso por su cocido no defraudó. Sin embargo, aún más espectacular fue el canelón que nos pusieron de entrante. Sin palabras. El vino delicioso. Muy buenos consejos del personal y muy buena atención.”"
  },
  {
    name: "Fernando Muñoz",
    rating: 5,
    text: "“Un restaurante que tendría que ser eterno y como ya pocos quedan, comida y trato de calidad. Fuimos cuatro amigos a comer el menú cocido, y tengo que decir que es ESPECTACULAR. La sopa con sabor de los de casa de tu abuela…”"
  },
  {
    name: "Jesús Sánchez",
    rating: 5,
    text: "“Espectacular sitio para comer comida tradicional, si es posible muy recomendable el menú de cocido que cada vez cuesta más de encontrar. La lasaña de cocido es increíble así como las diferentes carnes.”"
  },
  {
    name: "Claudia M.",
    rating: 5,
    text: "“Comimos el menú de cocido. De lunes a viernes 31.90€ más vino y postre. El local muy cómodo, quizás hacía demasiado calor. El cocido muy rico en general.”"
  },
  {
    name: "Susana López Ortiz",
    rating: 5,
    text: "“Fuimos a celebrar un cumpleaños en grupo y probamos su menú de fin de semana, los primeros platos nos gustaron a todos... el arroz que probamos estaba bueno... algunos segundos no nos parecieron tan buenos.”"
  },
  {
    name: "Francisco T.N.",
    rating: 5,
    text: "“La comida está muy rica, bien cocinada y muy buena calidad. Lo que menos me gustó fue la tarta de queso aunque estaba buena, le falta un poco más de personalidad.”"
  },
  {
    name: "Ana Sainz",
    rating: 5,
    text: "“Fuimos ayer a conocerlo y salimos encantados. Comida, servicio, precio, fantástico. Nos pusieron como detalle de la casa, un vasito con caldo, delicioso…”"
  },
  {
    name: "Mario Torres",
    rating: 5,
    text: "“Hemos estado probando la tapa de concurso y está muy buena, el ajoblanco muy suave y sabroso. La atención perfecta. Sitio muy recomendable.”"
  },
  {
    name: "Jose Manuel LN",
    rating: 5,
    text: "“Conocido bar del barrio de las Fuentes por sus menús caseros y la buena calidad del producto… Cenamos a base de raciones y un plato individual… Muy buena experiencia.”"
  }
];

const InstagramIcon = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="instagram-gradient" x1="0%" y1="100%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#fdf497" />
        <stop offset="5%" stopColor="#fdf497" />
        <stop offset="45%" stopColor="#fd5949" />
        <stop offset="60%" stopColor="#d6249f" />
        <stop offset="90%" stopColor="#285AEB" />
      </linearGradient>
    </defs>
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" fill="url(#instagram-gradient)"/>
  </svg>
);

const FacebookIcon = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" fill="#1877F2"/>
  </svg>
);

const Navbar = () => (
  <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-white shadow-md">
    <div className="flex items-center gap-3">
      <img 
        src="https://res.cloudinary.com/dfbsqy5ul/image/upload/v1771864463/49933936_620311541759490_6950325831705034752_n_ijbbns.jpg" 
        alt="Logo El Candelas" 
        className="w-10 h-10 rounded-full object-cover border border-black/5"
        referrerPolicy="no-referrer"
      />
      <span className="font-serif text-xl font-bold tracking-tight">El Candelas</span>
    </div>
    <div className="hidden md:flex items-center gap-8 text-sm font-medium uppercase tracking-wider">
      <a href="#conocenos" className="hover:text-brand-primary transition-colors">Conócenos</a>
      <a href="#carta" className="hover:text-brand-primary transition-colors">La Carta</a>
      <a href="#reseñas" className="hover:text-brand-primary transition-colors">Reseñas</a>
      <a href="#ubicacion" className="hover:text-brand-primary transition-colors">Contacto</a>
      <a href="tel:976423025" className="bg-brand-primary text-white px-6 py-2 rounded-full hover:bg-brand-primary/90 transition-all">Reservar Mesa</a>
    </div>
  </nav>
);

const Hero = () => (
  <section className="relative h-screen flex items-center justify-center overflow-hidden">
    <div className="absolute inset-0 z-0">
      <img 
        src="https://res.cloudinary.com/dfbsqy5ul/image/upload/v1771868683/574287773_1408249171300156_2873616831668374773_n_hf3oe1.jpg" 
        alt="Bar Restaurante El Candelas" 
        className="w-full h-full object-cover scale-105"
        referrerPolicy="no-referrer"
      />
      <div className="absolute inset-0 bg-black/40" />
    </div>
    
    <div className="relative z-10 text-center text-white px-6 max-w-4xl">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <span className="inline-block px-4 py-1 bg-brand-primary text-xs font-bold uppercase tracking-widest rounded-full mb-6">
          Desde 1960
        </span>
        <h1 className="text-6xl md:text-8xl font-bold mb-4 leading-tight">
          Bar Restaurante <br />
          <span className="italic">El Candelas</span>
        </h1>
        <p className="text-xl md:text-2xl font-serif italic mb-4 opacity-90">
          "El templo de la cuchara en Zaragoza"
        </p>
        <p className="text-lg mb-12 opacity-80 max-w-2xl mx-auto">
          Más de 60 años manteniendo viva la auténtica cocina tradicional aragonesa.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href="tel:976423025" className="btn-primary w-full sm:w-auto flex items-center justify-center gap-2">
            <Phone size={18} />
            Reservar ahora
          </a>
          <a href="#reseñas" className="btn-secondary w-full sm:w-auto flex items-center justify-center gap-2">
            <Star size={18} />
            Dejar reseña
          </a>
        </div>
      </motion.div>
    </div>
  </section>
);

const About = () => (
  <section id="conocenos" className="section-padding grid md:grid-cols-2 gap-16 items-center bg-white">
    <motion.div 
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className="relative"
    >
      <div className="aspect-[4/5] rounded-2xl overflow-hidden">
        <img 
          src="https://res.cloudinary.com/dfbsqy5ul/image/upload/v1771865237/619852705_18183149983364224_8606919832676195825_n_ghcpob.jpg" 
          alt="Interior del restaurante" 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
      </div>
      <div className="absolute -bottom-8 -right-8 bg-brand-cream p-8 rounded-2xl max-w-[280px]">
        <div className="flex items-center gap-2 mb-2 text-brand-primary">
          <Star size={16} fill="currentColor" />
          <span className="text-xs font-bold uppercase tracking-wider">Reconocimiento</span>
        </div>
        <h4 className="text-2xl font-bold mb-1">Guía Repsol</h4>
        <p className="text-sm text-gray-600">Uno de los mejores restaurantes de cuchara de España.</p>
      </div>
    </motion.div>
    
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
    >
      <h2 className="text-5xl md:text-6xl font-bold mb-8 leading-tight">
        60 Años de <span className="text-brand-primary italic">Tradición</span>
      </h2>
      <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
        <p>
          Ubicado en el barrio de <strong>Las Fuentes</strong>, en Zaragoza, El Candelas es un restaurante familiar con más de seis décadas de historia.
        </p>
        <p>
          Actualmente dirigido por <strong>Ana Belén Abadías</strong>, segunda generación al frente del negocio, el restaurante ha sabido evolucionar sin perder su esencia tradicional, consolidándose como referente de la gastronomía aragonesa.
        </p>
        <p>
          Tras su reciente reforma, el local mantiene la calidez de los restaurantes de toda la vida, combinando tradición y comodidad en un ambiente acogedor. Trabajamos con productos locales y de temporada, apostando siempre por la calidad y el producto de proximidad.
        </p>
        <div className="pt-6 grid grid-cols-2 gap-8">
          <div>
            <h5 className="font-bold text-brand-dark mb-1">Ubicación</h5>
            <p className="text-sm">Barrio Las Fuentes, Zaragoza</p>
          </div>
          <div>
            <h5 className="font-bold text-brand-dark mb-1">Especialidad</h5>
            <p className="text-sm">Cocina tradicional aragonesa</p>
          </div>
        </div>
        <div className="pt-8">
          <a href="#carta" className="inline-flex items-center gap-2 text-brand-primary font-bold hover:gap-4 transition-all">
            Ver nuestra carta <ChevronRight size={20} />
          </a>
        </div>
      </div>
    </motion.div>
  </section>
);

const MenuCard = ({ title, description, price, image, badge, imageClassName }: any) => (
  <motion.div 
    whileHover={{ y: -10 }}
    className="bg-white rounded-2xl overflow-hidden shadow-lg group"
  >
    <div className="h-48 overflow-hidden relative">
      <img 
        src={image} 
        alt={title} 
        className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 ${imageClassName || ""}`}
        referrerPolicy="no-referrer"
      />
      {badge && (
        <div className="absolute top-4 left-4 bg-brand-primary text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">
          {badge}
        </div>
      )}
    </div>
    <div className="p-8">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-2xl font-bold">{title}</h3>
        {price && <span className="text-brand-primary font-bold font-serif text-xl">{price}</span>}
      </div>
      <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
    </div>
  </motion.div>
);

const Menu = () => (
  <section id="carta" className="section-padding bg-brand-cream">
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-center max-w-3xl mx-auto mb-16"
    >
      <span className="text-brand-primary font-bold uppercase tracking-[0.2em] text-xs">Nuestra Cocina</span>
      <h2 className="text-5xl md:text-6xl font-bold mt-4 mb-6">La Carta</h2>
      <p className="text-gray-600 text-lg mb-4">Sabores auténticos que han pasado de generación en generación.</p>
    </motion.div>
    
    <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
      <MenuCard 
        title="Cocido Tradicional"
        description="Plato estrella. Servido en tres vuelcos: sopa, garbanzos con verduras y carnes. Disponible de lunes a viernes (fines de semana por encargo)."
        image="https://res.cloudinary.com/dfbsqy5ul/image/upload/v1771864463/610275430_18182388496364224_5014574580307482206_n_hisxaa.jpg"
        badge="Plato Estrella"
        imageClassName="object-bottom"
      />
      <MenuCard 
        title="Cocina Tradicional"
        description="Lentejas con arroz, migas a la pastora y nuestros famosos platos de casquería fina elaborados con recetas de toda la vida."
        image="https://res.cloudinary.com/dfbsqy5ul/image/upload/v1771864462/601547416_18179867374364224_4741095885800790232_n_q3ntuw.jpg"
      />
      <MenuCard 
        title="Especialidades Brasa"
        description="Selección de carnes aragonesas: Chuleta de vaca vieja y Churrasco a la brasa, preparados en nuestro fuego tradicional."
        image="https://res.cloudinary.com/dfbsqy5ul/image/upload/v1771864462/481863833_18149747200364224_7510386486562933628_n_c1whke.jpg"
      />
      <MenuCard 
        title="Tarta de Queso"
        description="Nuestra tarta de queso casera, muy valorada por nuestros clientes por su cremosidad y sabor inigualable."
        image="https://res.cloudinary.com/dfbsqy5ul/image/upload/v1771864463/589914429_18179199085364224_5609937940074274087_n_otoc4p.jpg"
      />
      <MenuCard 
        title="Menú del Día"
        description="Propuestas diarias basadas en la cocina de mercado y platos caseros reconfortantes."
        image="https://res.cloudinary.com/dfbsqy5ul/image/upload/v1771864463/589309154_18178035937364224_5482400287537168972_n_fqelod.jpg"
      />
      <MenuCard 
        title="Menús Especiales"
        description="Selecciones especiales para fines de semana con arroces, brasa y productos de temporada."
        image="https://res.cloudinary.com/dfbsqy5ul/image/upload/v1771864463/612995691_18182443867364224_5246168815072507891_n_opfgtw.jpg"
      />
    </div>
  </section>
);

const Reviews = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const itemsPerPage = isMobile ? 1 : 3;
  const totalPages = Math.ceil(REVIEWS_DATA.length / itemsPerPage);

  const nextPage = useCallback(() => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  }, [totalPages]);

  const prevPage = useCallback(() => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  }, [totalPages]);

  useEffect(() => {
    const timer = setInterval(nextPage, 5000);
    return () => clearInterval(timer);
  }, [nextPage]);

  const currentReviews = REVIEWS_DATA.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  return (
    <section id="reseñas" className="section-padding bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold mb-4">Lo que dicen nuestros clientes</h2>
          <p className="text-gray-600 text-lg">
            Más de 1.000 reseñas y una valoración media de 4,3 ⭐ en Google.
          </p>
        </motion.div>

        <div className="relative px-12">
          {/* Navigation Arrows */}
          <button 
            onClick={prevPage}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-white shadow-lg border border-black/5 hover:bg-brand-primary hover:text-white transition-all"
            aria-label="Anterior"
          >
            <ChevronLeft size={24} />
          </button>
          <button 
            onClick={nextPage}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-white shadow-lg border border-black/5 hover:bg-brand-primary hover:text-white transition-all"
            aria-label="Siguiente"
          >
            <ChevronRight size={24} />
          </button>

          <div className="overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentPage}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="grid grid-cols-1 md:grid-cols-3 gap-8"
              >
                {currentReviews.map((review, idx) => (
                  <div 
                    key={idx}
                    className="p-8 rounded-3xl bg-brand-cream shadow-sm flex flex-col h-full hover:shadow-md transition-shadow"
                  >
                    <div className="flex gap-1 text-brand-primary mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={16} fill="currentColor" />
                      ))}
                    </div>
                    <Quote className="text-brand-primary/10 mb-4" size={32} />
                    <p className="text-gray-700 italic mb-6 flex-grow leading-relaxed">
                      {review.text}
                    </p>
                    <div className="pt-4">
                      <h5 className="font-bold text-brand-dark">{review.name}</h5>
                    </div>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Indicators */}
          <div className="flex justify-center gap-2 mt-12">
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i)}
                className={`w-2 h-2 rounded-full transition-all ${
                  currentPage === i ? "bg-brand-primary w-8" : "bg-gray-300"
                }`}
                aria-label={`Ir a página ${i + 1}`}
              />
            ))}
          </div>
        </div>

        <div className="mt-20 text-center">
          <h3 className="text-2xl font-bold mb-6">Tu opinión nos ayuda a crecer</h3>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a 
              href="https://www.google.com/maps/place/Bar+Restaurante+El+Candelas/@41.6483772,-0.8619383,17z/data=!4m18!1m9!3m8!1s0xd59145a0e407b9f:0x851a9f784cdd369e!2sBar+Restaurante+El+Candelas!8m2!3d41.6483772!4d-0.8619383!9m1!1b1!16s%2Fg%2F11c5hjhbm9!3m7!1s0xd59145a0e407b9f:0x851a9f784cdd369e!8m2!3d41.6483772!4d-0.8619383!9m1!1b1!16s%2Fg%2F11c5hjhbm9" 
              target="_blank"
              className="bg-white border border-black/10 px-8 py-4 rounded-2xl flex items-center justify-center gap-3 hover:bg-gray-50 transition-all shadow-sm group"
            >
              <span className="text-xl">⭐</span>
              <span className="font-bold">Dejar reseña en Google</span>
              <ExternalLink size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
            <a 
              href="https://www.tripadvisor.es/Restaurant_Review-g187448-d5617895-Reviews-El_Candelas-Zaragoza_Province_of_Zaragoza_Aragon.html" 
              target="_blank"
              className="bg-white border border-black/10 px-8 py-4 rounded-2xl flex items-center justify-center gap-3 hover:bg-gray-50 transition-all shadow-sm group"
            >
              <span className="text-xl">🦉</span>
              <span className="font-bold">Dejar reseña en Tripadvisor</span>
              <ExternalLink size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

const Location = () => (
  <section id="ubicacion" className="section-padding bg-brand-dark text-white">
    <div className="grid md:grid-cols-2 gap-16 items-center">
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
      >
        <h2 className="text-5xl font-bold mb-8">Visítanos</h2>
        <p className="text-white/70 text-lg mb-12 leading-relaxed">
          Estamos ubicados en el corazón del barrio de Las Fuentes, donde la tradición se encuentra con el buen comer.
        </p>
        
        <div className="space-y-8">
          <div className="flex gap-6">
            <div className="w-12 h-12 flex items-center justify-center text-brand-primary shrink-0">
              <MapPin size={24} />
            </div>
            <div>
              <h5 className="font-bold text-xl mb-1">Dirección</h5>
              <p className="text-white/60">C/ del Maestro Mingote, 3<br />50002 Zaragoza, España</p>
            </div>
          </div>
          
          <div className="flex gap-6">
            <div className="w-12 h-12 flex items-center justify-center text-brand-primary shrink-0">
              <Phone size={24} />
            </div>
            <div>
              <h5 className="font-bold text-xl mb-1">Teléfono</h5>
              <p className="text-white/60">976 42 30 25</p>
            </div>
          </div>

          <div className="flex gap-6">
            <div className="w-12 h-12 flex items-center justify-center text-brand-primary shrink-0">
              <Mail size={24} />
            </div>
            <div>
              <h5 className="font-bold text-xl mb-1">Email</h5>
              <p className="text-white/60">restelcandelas@gmail.com</p>
            </div>
          </div>
          
          <div className="flex gap-6">
            <div className="w-12 h-12 flex items-center justify-center text-brand-primary shrink-0">
              <Clock size={24} />
            </div>
            <div>
              <h5 className="font-bold text-xl mb-1">Horario</h5>
              <div className="text-white/60 text-sm grid grid-cols-2 gap-x-4 gap-y-1">
                <span>Lunes:</span> <span>11:30 – 17:00</span>
                <span>Martes:</span> <span>09:30 – 17:00</span>
                <span>Miércoles:</span> <span>09:30 – 17:00</span>
                <span>Jueves:</span> <span>09:30 – 17:00</span>
                <span>Viernes:</span> <span>09:30 – 17:00 | 20:00 – 23:30</span>
                <span>Sábado:</span> <span>09:30 – 17:00 | 20:00 – 23:00</span>
                <span>Domingo:</span> <span>11:00 – 17:30</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-12">
          <a 
            href="https://www.google.com/maps/place/Bar+Restaurante+El+Candelas/@41.6483812,-0.8645132,819m/data=!3m2!1e3!4b1!4m6!3m5!1s0xd59145a0e407b9f:0x851a9f784cdd369e!8m2!3d41.6483772!4d-0.8619383!16s%2Fg%2F11c5hjhbm9?entry=ttu" 
            target="_blank"
            className="btn-primary inline-flex items-center gap-2"
          >
            Ver en Google Maps
            <ExternalLink size={18} />
          </a>
        </div>
      </motion.div>
      
      <motion.div 
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="h-[500px] rounded-3xl overflow-hidden"
      >
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2981.124803761895!2d-0.8645132!3d41.6483812!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd59145a0e407b9f%3A0x851a9f784cdd369e!2sBar+Restaurante+El+Candelas!5e0!3m2!1ses!2ses!4v1740329400000!5m2!1ses!2ses" 
          width="100%" 
          height="100%" 
          style={{ border: 0 }} 
          allowFullScreen 
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade"
        />
      </motion.div>
    </div>
  </section>
);

const ReservationCTA = () => (
  <section className="py-24 px-6 bg-brand-primary text-white text-center">
    <motion.div 
      initial={{ scale: 0.8, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      className="max-w-3xl mx-auto relative z-10"
    >
      <h2 className="text-6xl font-bold mb-8">Reserva tu mesa</h2>
      <p className="text-xl mb-6 opacity-90 font-serif italic">
        "No dejes para mañana el cocido que puedas comer hoy."
      </p>
      <p className="text-lg mb-12 opacity-80 max-w-xl mx-auto">
        Se recomienda reservar especialmente para el menú de cocido, nuestro plato más demandado. Ideal para comidas familiares, celebraciones y grupos.
      </p>
      <a 
        href="tel:976423025" 
        className="bg-white text-brand-primary px-12 py-6 rounded-full text-2xl font-bold hover:scale-110 active:scale-95 transition-all inline-flex items-center gap-4"
      >
        <Phone size={28} />
        Llamar ahora
      </a>
    </motion.div>
  </section>
);

const Footer = () => (
  <footer className="bg-brand-dark text-white/40 py-12 px-6">
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
      <div className="flex items-center gap-3 text-white/80">
        <img 
          src="https://res.cloudinary.com/dfbsqy5ul/image/upload/v1771864463/49933936_620311541759490_6950325831705034752_n_ijbbns.jpg" 
          alt="Logo El Candelas" 
          className="w-8 h-8 rounded-full object-cover"
          referrerPolicy="no-referrer"
        />
        <span className="font-serif text-xl font-bold">El Candelas</span>
      </div>
      
      <div className="flex gap-6">
        <a href="https://www.instagram.com/restauranteelcandelas/?hl=es" target="_blank" className="hover:scale-110 transition-transform">
          <InstagramIcon size={24} />
        </a>
        <a href="https://www.facebook.com/restauranteelcandelas/?locale=es_ES" target="_blank" className="hover:scale-110 transition-transform">
          <FacebookIcon size={24} />
        </a>
      </div>
      
      <div className="text-sm">
        © {new Date().getFullYear()} Bar Restaurante El Candelas. Todos los derechos reservados.
      </div>
    </div>
  </footer>
);

export default function App() {
  return (
    <div className="min-h-screen bg-white overflow-hidden">
      <Navbar />
      <Hero />
      <About />
      <Menu />
      <Reviews />
      <Location />
      <ReservationCTA />
      <Footer />
    </div>
  );
}
