"use client";

import { FormEvent, useState } from "react";

type Person = {
  name: string;
  age: number;
};

const Dashboard = () => {
  const [people, setPeople] = useState(new Map());
  const [person, setPerson] = useState({
    name: "",
    age: 0,
  });

  const addPerson = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newMap = new Map<string, Person>(people).set(
      person.name,
      person
    );

    setPeople(newMap);
  };

  return (
    <div>
      <form
        onSubmit={addPerson}
        className="mt-10 text-white"
      >
        <ul className="text-white">
          {Array.from(people.values()).map((n, i) => {
            return (
              <li key={i}>
                {n.name}
                {n.age}
              </li>
            );
          })}
        </ul>
        <input
          type="text"
          onChange={(e) =>
            setPerson({ ...person, name: e.target.value })
          }
          value={person.name}
          className="bg-zinc-900 text-white"
        />
        <input
          type="number"
          onChange={(e) =>
            setPerson({ ...person, age: +e.target.value })
          }
          value={person.age}
          className="bg-zinc-900 text-white"
        />
        <button>Add</button>
      </form>
      <div>
        <input type="text" name="" id="" />
      </div>
    </div>
  );
};
export default Dashboard;
