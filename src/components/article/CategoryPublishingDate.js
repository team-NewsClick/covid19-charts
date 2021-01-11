const CategoryPublishingDate = () => {
  return (
    <div className="flex text-gray-600">
      <div>Science</div>
      <div className="flex flex-auto justify-end">
        {new Date().toUTCString().slice(5, 16)}
      </div>
    </div>
  )
}

export default CategoryPublishingDate
