import useSWR from "swr"
import CovidDashboard from "../../components/CovidDashboard.js"
import LoaderFunction from "../../components/LoaderFunction"

const CityTracker = () => {
  const { data, error } = useSWR("/api/cities")
  const propsData = {
    data,
    trackerType: "city"
  }
  if (error) return <div>Failed to Load</div>
  if (!data) {
    return (
      <div className="flex h-screen">
        <div className="m-auto">
          <LoaderFunction />
        </div>
      </div>
    )
  }
  return (
    <div>
      <CovidDashboard data={propsData} />
    </div>
  )
}

export default CityTracker
