import Link from "@components/Link";
import ChevronRightIcon from "@heroicons/react/20/solid/ChevronRightIcon";
import StarIcon from "@heroicons/react/20/solid/StarIcon";

export default function UserRepos({ repos }) {
  return (
    <ul role="list" className="divide-y divide-gray-100">
      {repos.map((repo) => (
        <li
          key={repo._id}
          className="relative flex justify-between gap-x-6 px-4 py-5 hover:bg-gray-50 sm:px-6 lg:px-8"
        >
          <div className="flex gap-x-4">
            <img
              className="h-12 w-12 flex-none rounded-full bg-gray-50"
              src={`https://github.com/${repo.owner}.png`}
              alt={`${repo.owner} avatar`}
            />
            <div className="min-w-0 flex-auto">
              <p className="text-sm font-semibold leading-6 text-gray-900">
                <Link href={repo.url} target="_blank">
                  <span className="absolute inset-x-0 -top-px bottom-0" />
                  {repo.owner}/{repo.name}
                </Link>{" "}
                (
                {new Intl.DateTimeFormat("en-GB", {
                  dateStyle: "full",
                  timeStyle: "long",
                }).format(new Date(repo.dates.pushedAt))}
                )
              </p>
              <p className="mt-1 flex text-xs leading-5 text-gray-500">
                {repo.description}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-x-4">
            <div className="hidden sm:flex sm:flex-col sm:items-end">
              <p className="inline-flex gap-2 p-3 items-center content-center rounded-md bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-800 ring-1 ring-inset ring-yellow-600/20">
                <StarIcon
                  className="h-4 w-4 flex-none text-gray-400"
                  aria-hidden="true"
                />
                {repo.stats.stars}
              </p>
            </div>
            <ChevronRightIcon
              className="h-5 w-5 flex-none text-gray-400"
              aria-hidden="true"
            />
          </div>
        </li>
      ))}
    </ul>
  );
}
