import Button from '../../components/button';
import Input from '../../components/input';
import Select from '../../components/select';

const PersonalInformation = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2
        className="text-2xl font-bold text-center"
        style={{ color: 'var(--primary-color)' }}
      >
        Personal Information
      </h2>
      <form className="mt-6 space-y-6">
        {/* Basic Information Section */}
        <div className="border panel rounded-md p-4">
          <h3
            className="text-lg font-medium mb-4"
            style={{ color: 'var(--primary-color)' }}
          >
            Basic Information
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <Input label="First name" placeholder="Enter your first name" />
            <Input label="Last Name" placeholder="Enter your last name" />
            <Input label="Middle Name" placeholder="Enter your middle name" />
            <Input label="Date of Birth" type="date" />
            <Input label="Age" placeholder="Enter your age" type="number" />
          </div>
        </div>

        {/* Contact Information Section */}
        <div className="border panel rounded-md p-4">
          <h3
            className="text-lg font-medium mb-4"
            style={{ color: 'var(--primary-color)' }}
          >
            Contact Information
          </h3>

          {/* Addresses Panel */}
          <div className="panel mb-6">
            <h4 className="text-md font-semibold mb-4">Addresses</h4>
            <div className="grid grid-cols-2 gap-4">
              <Input label="Country" placeholder="Enter country" />
              <Input label="City" placeholder="Enter city" />
              <Input label="Street" placeholder="Enter street" />
              <Input label="Postal Code" placeholder="Enter postal code" />
              <Select
                label="Type"
                options={[
                  { key: 'mailing', text: 'Mailing', value: 'mailing' },
                  { key: 'work', text: 'Work', value: 'work' },
                ]}
              />
            </div>
            <Button>Add Address</Button>
          </div>

          {/* Emails Panel */}
          <div className="panel mb-6">
            <h4 className="text-md font-semibold mb-4">Emails</h4>
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Email Address"
                placeholder="Enter email address"
                type="email"
              />
              <Select
                label="Type"
                options={[
                  {
                    key: 'email-personal',
                    text: 'Personal',
                    value: 'personal',
                  },
                  { key: 'emailWork', text: 'Work', value: 'Work' },
                ]}
              />
              <Select
                label="Preferred"
                options={[
                  { key: 'emailYes', text: 'Yes', value: 'yes' },
                  { key: 'emailNo', text: 'No', value: 'no' },
                ]}
              />
            </div>
            <Button>Add Email</Button>
          </div>

          {/* Phones Panel  */}
          <div className="panel">
            <h4 className="text-md font-semibold mb-4">Phones</h4>
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Phone Number"
                placeholder="Enter phone number"
                type="tel"
              />
              <Select
                label="Type"
                options={[
                  {
                    key: 'phonePersonal',
                    text: 'Personal',
                    value: 'personal',
                  },
                  { key: 'phoneWork', text: 'Work', value: 'work' },
                ]}
              />
              <Select
                label="Preferred"
                options={[
                  { key: 'phoneYes', text: 'Yes', value: 'yes' },
                  { key: 'phoneNo', text: 'No', value: 'no' },
                ]}
              />
            </div>
            <Button>Add Phone</Button>
          </div>
        </div>

        {/* Submit Button */}
        <div className="text-right">
          <Button>Submit</Button>
        </div>
      </form>
    </div>
  );
};

export default PersonalInformation;
