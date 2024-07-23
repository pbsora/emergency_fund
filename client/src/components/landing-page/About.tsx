import { FaArrowRightLong } from "react-icons/fa6";

const About = () => {
  return (
    <section className="w-full min-h-screen h-screen bg-slate-50">
      <div className="container w-10/12 m-auto h-full flex flex-col justify-center gap-40">
        <div className="space-y-4 rounded-2xl w-full py-20 px-20 relative before:absolute before:w-[5px] before:h-2/4 before:bg-yellow-400 before:top-[50%] before:translate-y-[-50%] before:left-0 before:rounded-xl">
          <h2 className="text-lg font-semibold text-zinc-600">
            Why do you need an emergency fund?
          </h2>
          <p className="text-xl leading-loose">
            According to a recent survey, 56% of U.S. adults
            lack the emergency fund to handle a $1,00
            unexpected expense and one-third (35%) said they
            would have to borrow the money somehow to pay it
          </p>
          <a
            href="https://www.foxbusiness.com/economy/most-americans-cannot-afford-1000-emergency-expense"
            target="_blank"
            className="flex items-center gap-4 text-2xl hover:text-yellow-500 duration-200 w-fit"
          >
            Read more
            <FaArrowRightLong />
          </a>
        </div>
        <div>
          <h2>Why do you need an emergency fund?</h2>
          <p>
            According to a recent survey, 56% of U.S. adults
            lack the emergency fund to handle a $1,00
            unexpected expense and one-third (35%) said they
            would have to borrow the money somehow to pay it
          </p>
        </div>
      </div>
    </section>
  );
};
export default About;
