import userimg from "../assets/images/user.png";

function HighscoreBoard() {
  return (
    <div className="h-60	w-80 overflow-auto	">
      <ul class="max-w-lg divide-y divide-gray-200 dark:divide-gray-700 pr-5">
        <li class="pb-3 sm:pb-4">
          <div class="flex items-center space-x-4">
            <div class="flex-shrink-0">
              <img class="w-8 h-8 rounded-full" src={userimg} alt=" " />
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                <span className="text-base font-semibold mr-2">1.</span>Neil Sims
              </p>
              <p class="text-sm text-gray-500 truncate dark:text-gray-400">
                The Outsiders
              </p>
            </div>
            <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
              45
            </div>
          </div>
        </li>
        <li class="py-3 sm:py-4">
          <div class="flex items-center space-x-4">
            <div class="flex-shrink-0">
              <img class="w-8 h-8 rounded-full" src={userimg} alt=" " />{" "}
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
              <span className="text-base font-semibold mr-1">2.</span> Bonnie Green
              </p>
              <p class="text-sm text-gray-500 truncate dark:text-gray-400">
                The Machines
              </p>
            </div>
            <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
              40
            </div>
          </div>
        </li>
        <li class="py-3 sm:py-4">
          <div class="flex items-center space-x-4">
            <div class="flex-shrink-0">
              <img class="w-8 h-8 rounded-full" src={userimg} alt=" " />{" "}
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
              <span className="text-base font-semibold mr-1">3.</span>Michael Gough
              </p>
              <p class="text-sm text-gray-500 truncate dark:text-gray-400">
                The Outsiders
              </p>
            </div>
            <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
              40
            </div>
          </div>
        </li>
        <li class="py-3 sm:py-4">
          <div class="flex items-center space-x-4">
            <div class="flex-shrink-0">
              <img class="w-8 h-8 rounded-full" src={userimg} alt=" " />{" "}
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
              <span className="text-base font-semibold mr-1">4.</span>Thomas Lean
              </p>
              <p class="text-sm text-gray-500 truncate dark:text-gray-400">
                The Outsiders
              </p>
            </div>
            <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
              30
            </div>
          </div>
        </li>
        <li class="pt-3 pb-0 sm:pt-4">
          <div class="flex items-center space-x-4">
            <div class="flex-shrink-0">
              <img class="w-8 h-8 rounded-full" src={userimg} alt=" " />
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
              <span className="text-base font-semibold mr-1">5.</span>Lana Byrd
              </p>
              <p class="text-sm text-gray-500 truncate dark:text-gray-400">
                The Machines
              </p>
            </div>
            <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
              20
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
}

export default HighscoreBoard;
