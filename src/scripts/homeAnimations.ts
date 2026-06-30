import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

if (!prefersReducedMotion) {
  const mm = gsap.matchMedia();

  gsap.set(".envelope", {
    scale: 0.78,
    y: 60,
    rotateX: 10,
    transformOrigin: "50% 50%",
  });
  gsap.set(".letter", { y: "23%", scale: 0.94 });
  gsap.set(".envelope__flap--top", {
    rotateX: 0,
    transformPerspective: 1400,
    transformOrigin: "50% 0%",
  });
  gsap.set(".invitation__copy", { autoAlpha: 0.72 });
  gsap.set(".invitation-handoff", { autoAlpha: 0 });
  gsap.set(".invitation-handoff__bloom", { autoAlpha: 0, scale: 0.58, y: 38 });

  const invitationTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: ".invitation",
      start: "top top",
      end: "bottom bottom",
      scrub: 1,
      pin: ".invitation__stage",
      anticipatePin: 1,
    },
  });

  invitationTimeline
    .to(".envelope", { scale: 1, y: 0, rotateX: 0, duration: 0.65, ease: "power3.out" }, 0)
    .to(".envelope-shadow", { scaleX: 1.18, autoAlpha: 0.78, duration: 0.65 }, 0)
    .to(".wax-seal", { scale: 1.16, rotate: 7, duration: 0.28, ease: "power2.out" }, 0.34)
    .to(".wax-seal", { scale: 0.42, autoAlpha: 0, x: -94, y: 86, rotate: -96, duration: 0.5, ease: "power3.in" }, 0.62)
    .to(
      ".seal-fragment",
      {
        autoAlpha: 1,
        x: (index: number) => [-92, 78, -28][index] || 0,
        y: (index: number) => [92, 64, 128][index] || 0,
        rotate: (index: number) => [-78, 62, 118][index] || 0,
        scale: (index: number) => [0.78, 0.64, 0.52][index] || 0.6,
        duration: 0.62,
        stagger: 0.04,
        ease: "power3.out",
      },
      0.58
    )
    .to(".envelope__flap--top", { rotateX: -178, y: -5, duration: 0.84, ease: "power2.inOut" }, 0.76)
    .to(".letter", { y: "-34%", scale: 1.02, duration: 0.78, ease: "power3.out" }, 1.02)
    .to(".envelope__pocket--left", { x: "-4%", rotateZ: -2, duration: 0.52, ease: "power2.out" }, 1.12)
    .to(".envelope__pocket--right", { x: "4%", rotateZ: 2, duration: 0.52, ease: "power2.out" }, 1.12)
    .to(
      ".invitation-bloom",
      {
        autoAlpha: 1,
        scale: (index: number) => [1.28, 1.1, 1.42][index] || 1.2,
        x: (index: number) => [-34, 28, 18][index] || 0,
        y: (index: number) => [18, -24, 36][index] || 0,
        rotate: (index: number) => [-18, 22, 42][index] || 0,
        duration: 0.72,
        stagger: 0.06,
        ease: "back.out(1.8)",
      },
      1.18
    )
    .to(".letter", { y: "-74%", scale: 1.16, rotateX: 0, duration: 0.82, ease: "power3.inOut" }, 1.72)
    .to(".envelope", { scale: 1.14, y: "8%", duration: 0.82, ease: "power2.inOut" }, 1.76)
    .to(".invitation__copy", { autoAlpha: 0, y: 12, duration: 0.32 }, 1.84)
    .to(".invitation-handoff", { autoAlpha: 1, duration: 0.74, ease: "power2.out" }, 2.12)
    .to(
      ".invitation-handoff__bloom",
      {
        autoAlpha: 1,
        scale: (index: number) => [1.16, 0.98, 1.28][index] || 1,
        y: (index: number) => [-10, 18, -18][index] || 0,
        rotate: (index: number) => [18, -14, 32][index] || 0,
        duration: 0.78,
        stagger: 0.08,
        ease: "power3.out",
      },
      2.16
    )
    .to(".envelope-scene", { autoAlpha: 0, scale: 1.36, filter: "blur(14px)", duration: 0.58, ease: "power2.in" }, 2.45)
    .to(".invitation__grain", { autoAlpha: 0, duration: 0.42 }, 2.52);

  gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((element) => {
    gsap.from(element, {
      autoAlpha: 0,
      y: 46,
      clipPath: "inset(16% 0 0 0)",
      duration: 0.9,
      ease: "power3.out",
      scrollTrigger: {
        trigger: element,
        start: "top 82%",
        once: true,
      },
    });
  });

  mm.add("(min-width: 901px)", () => {
    const cards = gsap.utils.toArray<HTMLElement>(".story-card");
    const media = gsap.utils.toArray<HTMLElement>(".story-media");
    const backdrops = gsap.utils.toArray<HTMLElement>(".story-backdrop");
    const dots = gsap.utils.toArray<HTMLElement>("[data-story-dot]");
    const time = document.querySelector<HTMLElement>(".story-progress__time");
    const count = document.querySelector<HTMLElement>(".story-progress__count");
    const fill = document.querySelector<HTMLElement>(".story-progress__fill");
    const kicker = document.querySelector<HTMLElement>(".story-kicker");
    const headline = document.querySelector<HTMLElement>("#story-title");
    const route = document.querySelector<SVGPathElement>(".story-route path");

    if (cards.length === 0 || media.length === 0 || backdrops.length === 0) {
      return;
    }

    if (route) {
      const routeLength = route.getTotalLength();
      route.style.strokeDasharray = `${routeLength}`;
      route.style.strokeDashoffset = `${routeLength}`;
    }

    let activeScene = -1;

    const setScene = (index: number) => {
      const scene = Math.max(0, Math.min(index, cards.length - 1));
      const card = cards[scene];

      if (scene === activeScene) {
        return;
      }

      activeScene = scene;

      if (time) {
        time.textContent = card.dataset.time || "";
      }

      if (count) {
        const lastNumber = cards[cards.length - 1]?.dataset.number || "06";
        count.textContent = `${card.dataset.number || "00"} / ${lastNumber}`;
      }

      dots.forEach((dot, dotIndex) => {
        dot.classList.toggle("is-active", dotIndex === scene);
      });

      cards.forEach((storyCard, cardIndex) => {
        storyCard.classList.toggle("is-active", cardIndex === scene);
      });

      media.forEach((mediaElement, mediaIndex) => {
        mediaElement.classList.toggle("is-active", mediaIndex === scene);
      });

      backdrops.forEach((backdrop, backdropIndex) => {
        backdrop.classList.toggle("is-active", backdropIndex === scene);
      });

      if (kicker && headline) {
        const textTargets = [kicker, headline];

        kicker.textContent = card.dataset.kicker || "";
        headline.textContent = card.dataset.headline || "";

        gsap.fromTo(
          textTargets,
          { autoAlpha: 0, y: 18, filter: "blur(10px)" },
          {
            autoAlpha: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.35,
            ease: "power3.out",
            stagger: 0.04,
            overwrite: true,
          }
        );
      }
    };

    gsap.set(cards, { autoAlpha: 0, y: 54, filter: "blur(14px)" });
    gsap.set(cards[0], { autoAlpha: 1, y: 0, filter: "blur(0px)" });
    gsap.set(media, {
      autoAlpha: 0,
      scale: 0.72,
      y: 90,
      rotate: -18,
      transformOrigin: "50% 82%",
    });
    gsap.set(media[0], { autoAlpha: 1, scale: 1, y: 0, rotate: -5 });
    gsap.set(backdrops, { autoAlpha: 0 });
    gsap.set(backdrops[0], { autoAlpha: 1 });
    gsap.set(".story-object", { autoAlpha: 0, y: 34, scale: 0.82 });
    setScene(0);

    const storyTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: ".story",
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
        pin: ".story__stage",
        anticipatePin: 1,
        onUpdate: (self) => {
          const scene = Math.min(cards.length - 1, Math.floor(self.progress * cards.length));
          setScene(scene);
          if (fill) {
            gsap.set(fill, { scaleX: self.progress });
          }
        },
      },
    });

    if (route) {
      storyTimeline.to(route, { strokeDashoffset: 0, duration: cards.length - 1 }, 0);
    }

    storyTimeline
      .to(".orbit-ring--outer", { rotate: 54, scale: 1.1, duration: cards.length - 1 }, 0)
      .to(".orbit-ring--middle", { rotate: -42, scale: 0.94, duration: cards.length - 1 }, 0)
      .to(".orbit-ring--inner", { rotate: 88, scale: 1.16, duration: cards.length - 1 }, 0);

    cards.forEach((card, index) => {
      if (index === 0) {
        return;
      }

      const previous = index - 1;
      const position = index;
      const mediaShift = index % 2 === 0 ? -42 : 42;
      const mediaTurn = index % 2 === 0 ? -10 : 10;

      storyTimeline
        .to(cards[previous], { autoAlpha: 0, y: -46, filter: "blur(14px)", duration: 0.34 }, position - 0.35)
        .to(media[previous], { autoAlpha: 0, scale: 1.08, y: -55, rotate: mediaTurn, duration: 0.42 }, position - 0.37)
        .to(backdrops[previous], { autoAlpha: 0, duration: 0.48 }, position - 0.36)
        .fromTo(
          cards[index],
          { autoAlpha: 0, y: 58, filter: "blur(14px)" },
          { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 0.46 },
          position - 0.04
        )
        .fromTo(
          media[index],
          { autoAlpha: 0, scale: 0.72, y: 90, x: mediaShift, rotate: -mediaTurn },
          { autoAlpha: 1, scale: 1, y: 0, x: 0, rotate: mediaTurn * 0.35, duration: 0.56 },
          position - 0.14
        )
        .to(backdrops[index], { autoAlpha: 1, duration: 0.58 }, position - 0.24);

      if (index === 3) {
        storyTimeline.to(".story-object--wrap", { autoAlpha: 1, y: 0, scale: 1, rotate: 7, duration: 0.42 }, position + 0.2);
      }

      if (index === 4) {
        storyTimeline.to(".story-object--tag", { autoAlpha: 1, y: 0, scale: 1, rotate: -8, duration: 0.42 }, position + 0.15);
      }

      if (index === 6) {
        storyTimeline.to(".story-object--door", { autoAlpha: 1, y: 0, scale: 1, duration: 0.44 }, position + 0.1);
      }
    });

    return () => {
      storyTimeline.kill();
    };
  });

  mm.add("(max-width: 900px)", () => {
    const cards = gsap.utils.toArray<HTMLElement>(".story-card");
    const dots = gsap.utils.toArray<HTMLElement>("[data-story-dot]");
    const time = document.querySelector<HTMLElement>(".story-progress__time");
    const count = document.querySelector<HTMLElement>(".story-progress__count");
    const fill = document.querySelector<HTMLElement>(".story-progress__fill");

    if (cards.length === 0) {
      return;
    }

    const setScene = (index: number) => {
      const scene = Math.max(0, Math.min(index, cards.length - 1));
      const card = cards[scene];
      const lastNumber = cards[cards.length - 1]?.dataset.number || "06";

      cards.forEach((storyCard, cardIndex) => {
        storyCard.classList.toggle("is-active", cardIndex === scene);
      });

      dots.forEach((dot, dotIndex) => {
        dot.classList.toggle("is-active", dotIndex === scene);
      });

      if (time) {
        time.textContent = card.dataset.time || "";
      }

      if (count) {
        count.textContent = `${card.dataset.number || "00"} / ${lastNumber}`;
      }

      if (fill) {
        const denominator = Math.max(1, cards.length - 1);
        gsap.set(fill, { scaleX: scene / denominator });
      }
    };

    setScene(0);

    const triggers = cards.map((card, index) =>
      ScrollTrigger.create({
        trigger: card,
        start: "top 58%",
        end: "bottom 42%",
        onEnter: () => setScene(index),
        onEnterBack: () => setScene(index),
      })
    );

    return () => {
      triggers.forEach((trigger) => trigger.kill());
    };
  });

  gsap.to(".arrival__image img", {
    scale: 1.12,
    ease: "none",
    scrollTrigger: {
      trigger: ".arrival",
      start: "top bottom",
      end: "bottom top",
      scrub: true,
    },
  });

  window.addEventListener("load", () => ScrollTrigger.refresh());
}
