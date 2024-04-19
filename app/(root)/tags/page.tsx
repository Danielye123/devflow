import UserCard from "@/components/cards/UserCard";
import Filter from "@/components/shared/Filter";
import LocalSearchbar from "@/components/shared/search/LocalSearchbar";
import { TagFilters } from "@/constants/filters";
import { getAllUsers } from "@/lib/actions/user.action";
import Link from "next/link";

const Page = async () => {
    const result = await getAllUsers({});

  return (
    <>
      <h1 className="h1-bold text-dark100_light900">Tags</h1>
      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearchbar
          route="/tags"
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="Search by tag name..."
          otherClasses="flex-1"
        />

        <Filter
          filters={TagFilters}
          otherClasses="min-h-[56px] sm:min-w-[170px]"
        />
      </div>

      <section className="mt-12 flex flex-wrap gap-4">
        {result.users.length > 0 ? (
            result.users.map((user) => (
                <UserCard key={user._id} user={user} />
            ))
        ): (
            <div className="paragraph-regular text-dark200_light800 mx-auto max-w-4xl text-center">
                <p>No tags yet</p>
                <Link href="/sign-up" className="mt-2 font-bold text-accent-blue">
                    Add a tag now!
                </Link>
            </div>
        )}
      </section>
    </>
  );
};

export default Page;
