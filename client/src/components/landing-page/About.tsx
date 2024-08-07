const About = () => {
  return (
    <section className="w-full min-h-screen bg-slate-50 overflow-hidden px-6 lg:px-36 flex flex-col gap-5">
      <div className="flex flex-col gap-6 py-10 lg:flex-row lg:mt-20">
        <h2 className="text-2xl lg:text-3xl font-bold text-zinc-700 lg:w-5/12">
          What is an emergency fund?
        </h2>
        <div className="lg:w-7/12 flex flex-col gap-5">
          <p className="text-base leading-loose lg:leading-8 text-zinc-500 font-semibold">
            An emergency fund is a stash of money set aside
            to cover the financial surprises life throws
            your way.
          </p>
          <p className="lg:text-base leading-loose lg:leading-8 text-zinc-500 font-semibold">
            These unexpected events can be stressful and
            costly. For example, you may need to replace
            your car's transmission, or you may need to
            cover the cost of a hospital stay or you might
            lose your job. An emergency fund can help you
            cover these unexpected expenses and avoid going
            into debt.
          </p>
        </div>
      </div>
      <hr className="border-b border-zinc-300" />
      <div className="flex flex-col gap-6 py-10 lg:flex-row lg:mt-10">
        <h2 className="text-2xl lg:text-3xl font-bold text-zinc-700 lg:w-5/12">
          Why do you need one?
        </h2>
        <div className="lg:w-7/12 flex flex-col gap-5">
          <p className="lg:text-base leading-loose lg:leading-8 text-zinc-500 font-semibold">
            According to a {""}
            <a
              href="https://www.foxbusiness.com/economy/most-americans-cannot-afford-1000-emergency-expense"
              target="_blank"
              className="text-blue-500 hover:underline underline-offset-4 duration-200"
            >
              recent survey
            </a>
            , 56% of U.S. adults lack the emergency fund to
            handle a $1,000 unexpected expense and one-third
            (35%) said they would have to borrow the money
            somehow to pay it.
          </p>
          <p className="lg:text-base leading-loose lg:leading-8 text-zinc-500 font-semibold">
            An emergency fund allows you to not be shaken up
            by life, remain calm and face the problem
            without losing your marbles.
          </p>
          <p className="lg:text-base leading-loose lg:leading-8 text-zinc-500 font-semibold">
            You probably know someone that went through
            something like this: they lost their job, had to
            pay for a medical emergency, or had to fix their
            car. But they didn't have an emergency fund, so
            they had to swallow their pride and ask family
            or friends for help. Or worse, they had to take
            a loan. That's how the spiral of debt and stress
            starts.
          </p>
          <p className="lg:text-base leading-loose lg:leading-8 text-zinc-500 font-semibold">
            But with an emergency fund, you can avoid that.
            Life will continue as usual.
          </p>
        </div>
      </div>
    </section>
  );
};
export default About;
