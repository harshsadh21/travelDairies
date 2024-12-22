const Card = () => {
  return (
    <div className=" rounded  shadow-lg relative my-10  ">
      {/* Image */}
      <img
        className=" rounded-xl h-72 "
        src="https://images.unsplash.com/photo-1530841344029-ec3ae0fa4cc4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8c3dpdHplcmxhbmR8ZW58MHx8MHx8fDA%3D"
        alt="Card Image"
      />
      {/* Heading/Text on Image */}
      <div className="  absolute inset-0 top-60 left-10 ">
        <h2 className="text-white text-2xl font-bold rounded inline-block bg-black bg-opacity-45">
          Image Heading
        </h2>
      </div>
    </div>
  );
};

export default Card;
