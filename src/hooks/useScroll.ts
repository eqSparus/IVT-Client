export default () => {
  const scrollTo = (select: string) => {
    const el = document.querySelector(select);
    if (el) {
      const to = window.scrollY + el.getBoundingClientRect().y;
      window.scroll({ left: 0, top: to, behavior: 'smooth' });
    }
  };

  return {
    scrollTo,
  };
};
