import HomeHeader from "../components/home/HomeHeader";
import PlatformFilters from "../components/home/PlatformFilters";
import ContestGrid from "../components/home/ContestGrid";


const Home = ({ contestState }) => {
    const {
        filtered,
        loading,
        platforms,
        activePlatform,
        setActivePlatform,
        setSearchQuery,
        fetchContests,
    } = contestState;

    return (
        <div className="p-6 lg:p-10">
            <HomeHeader

                setSearchQuery={setSearchQuery}
                fetchContests={fetchContests}
                loading={loading}
            />

            <PlatformFilters
                platforms={platforms}
                activePlatform={activePlatform}
                setActivePlatform={setActivePlatform}
            />

            <ContestGrid contests={filtered} loading={loading} />
        </div>
    );
};

export default Home;
