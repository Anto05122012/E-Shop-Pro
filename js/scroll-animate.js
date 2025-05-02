gsap.registerPlugin(ScrollTrigger);

document.addEventListener("DOMContentLoaded", () => {
  const lenis = new Lenis({
    smooth: true,
    lerp: 0.1
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  lenis.on('scroll', ScrollTrigger.update);
  ScrollTrigger.addEventListener('refresh', () => lenis.resize());

  // ===== Các hiệu ứng cũ =====
  gsap.utils.toArray(".fade-in").forEach(el => {
    gsap.fromTo(
      el,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          toggleActions: "play reverse play reverse",
          once: false,
          markers: false // bạn bật true để debug nếu muốn
        }
      }
    );
  });
  
  
  
  
  
  

  gsap.utils.toArray(".slide-left").forEach(el => {
    gsap.fromTo(el, { x: -100, opacity: 0 }, {
      x: 0,
      opacity: 1,
      duration: 1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: el,
        start: "top 90%",
        toggleActions: "play reverse play reverse"
      }
    });
  });

  gsap.utils.toArray(".slide-right").forEach(el => {
    gsap.fromTo(el, { x: 100, opacity: 0 }, {
      x: 0,
      opacity: 1,
      duration: 1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: el,
        start: "top 90%",
        toggleActions: "play reverse play reverse"
      }
    });
  });

  gsap.utils.toArray(".zoom-in").forEach(el => {
    gsap.fromTo(el, { scale: 0.8, opacity: 0 }, {
      scale: 1,
      opacity: 1,
      duration: 1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: el,
        start: "top 90%",
        toggleActions: "play reverse play reverse"
      }
    });
  });

  gsap.utils.toArray(".parallax-text").forEach(el => {
    gsap.to(el, {
      yPercent: -30,
      ease: "none",
      scrollTrigger: {
        trigger: el,
        start: "top bottom",
        scrub: true
      }
    });
  });

  gsap.utils.toArray(".float-card").forEach((el, i) => {
    gsap.fromTo(el, { opacity: 0, y: 150, rotation: i % 2 === 0 ? -10 : 10 }, {
      opacity: 1,
      y: 0,
      rotation: 0,
      duration: 1.5,
      ease: "expo.out",
      scrollTrigger: {
        trigger: el,
        start: "top 80%",
        end: "bottom top",
        scrub: true
      }
    });
  });

  gsap.fromTo(".big-title",
    { y: 100, clipPath: "inset(50% 0% 50% 0%)", opacity: 0 },
    {
      y: 0,
      clipPath: "inset(0% 0% 0% 0%)",
      opacity: 1,
      duration: 1.5,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".big-title",
        start: "top 90%",
        end: "top 30%",
        scrub: true
      }
    }
  );

  ScrollTrigger.refresh();
});