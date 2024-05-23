import CustomField from "../../../../components/ui/CustomField";
import { useTransition, animated } from "react-spring";
import { useEffect, useState } from "react";

const ShowDetailsTask = ({ details, onCancel }) => {
  const [ShowDetails, setShowDetails] = useState(false);

  const priorityColors = {
    high: "#ff0000",
    medium: "#ffa500",
    low: "#008000",
  };

  const transitions = useTransition(ShowDetails, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: { duration: 400 },
  });

  useEffect(() => {
    setShowDetails(true);
  }, []);

  return transitions(
    (styles, item) =>
      item && (
        <animated.div
          style={styles}
          className='fixed inset-0 z-50 flex items-center justify-center'
        >
          <div className='absolute inset-0 bg-gray-900 bg-opacity-50'></div>
          <div className='relative z-10 w-full max-w-md rounded-xl bg-white p-4 text-black shadow-lg'>
            <h3 className='mb-4 text-xl font-semibold'>Task Details</h3>
            <div>
              <div>
                <CustomField label='Task' value={details?.task} />
              </div>
              <div>
                <CustomField
                  label='Priority'
                  value={details?.priority}
                  style={{
                    color: priorityColors[details?.priority.toLowerCase()],
                  }}
                />
              </div>
              <div>
                <CustomField label='Status' value={details?.status} />
              </div>
              <div>
                <CustomField label='Owner' value={details?.owner} />
              </div>
              <div className='mt-4'>
                <button
                  type='button'
                  onClick={onCancel}
                  className='mr-2 text-red-500'
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </animated.div>
      ),
  );
};
export default ShowDetailsTask;
