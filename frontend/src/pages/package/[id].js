import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';

const PackageDetail = () => {
  const router = useRouter();
  const { id } = router.query; // Get the dynamic ID from the URL
  const [packageData, setPackageData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:5000/packages/${id}`)
        .then((res) => {
          setPackageData(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.error('Error fetching package details:', err);
          setLoading(false);
        });
    }
  }, [id]);

  if (loading) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  if (!packageData) {
    return <p className="text-center mt-10 text-red-500">Package not found!</p>;
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <img
          src={packageData.image}
          alt={packageData.title}
          className="w-full h-64 object-cover rounded"
        />
        <h1 className="text-4xl font-bold mt-4 mb-2">{packageData.title}</h1>
        <p className="text-gray-600 mb-4">{packageData.description}</p>
        <p className="text-green-600 font-bold mb-4">Price: INR {packageData.price}</p>
        <div>
          <h3 className="text-2xl font-semibold mt-6 mb-2">Available Dates</h3>
          <ul>
            {packageData.availableDates.map((date, index) => (
              <li key={index} className="text-gray-600">
                {date}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PackageDetail;
