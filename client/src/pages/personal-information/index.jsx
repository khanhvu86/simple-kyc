import { useFieldArray, useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import { useUpdatePersonalInformationMutation } from '../../hooks/personal-information';
import {
  addressTypes,
  documentTypes,
  emailPreferred,
  emailTypes,
  phonePreferred,
  phoneTypes,
} from './options';
import { getPersonalInformation } from '../../apis/personal-information';
import Button from '../../components/button';
import Input from '../../components/input';
import Select from '../../components/select';

const defaultPersonalInformation = {
  firstName: '',
  lastName: '',
  dateOfBirth: '',
  age: 0,
  addresses: [
    {
      country: '',
      city: '',
      street: '',
      postalCode: 0,
      type: 0,
    },
  ],
  emails: [
    {
      email: '',
      type: 0,
      preferred: false,
    },
  ],
  phones: [
    {
      phone: '',
      type: 0,
      preffered: false,
    },
  ],
  documents: [
    {
      type: 0,
      expiryDate: '',
    },
  ],
  occupations: [
    {
      occupation: '',
      fromDate: '',
      toDate: '',
    },
  ],
};

const PersonalInformation = () => {
  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
    reset,
  } = useForm(defaultPersonalInformation);

  const [addresses, setAddresses] = useState([
    {
      country: '',
      city: '',
      street: '',
      postalCode: '',
      type: 0,
    },
  ]);

  const { fields: addressFields, append: appendAddress } = useFieldArray({
    control,
    name: 'addresses',
  });

  const { fields: emailFields, append: appendEmail } = useFieldArray({
    control,
    name: 'emails',
  });

  const { fields: phoneFields, append: appendPhone } = useFieldArray({
    control,
    name: 'phones',
  });

  const { fields: documentFields, append: appendDocument } = useFieldArray({
    control,
    name: 'documents',
  });

  const { fields: occupationFields, append: appendOccupation } = useFieldArray({
    control,
    name: 'occupations',
  });

  const {
    mutateAsync: updatePersonalInformation,
    isPending,
    error,
  } = useUpdatePersonalInformationMutation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getPersonalInformation('0Y_F3Tk');

        reset(response.data);

        // setAddresses(data.addresses);
        // setEmails(data.emails);
        // setPhones(data.phones);
        // setDocuments(data.documents);
        // setOccupations(data.occupations);
      } catch (err) {
        console.error('Get personal information failed: ', err);
      }
    };
    fetchData();
  }, [reset]);

  const onSubmit = async (data) => {
    try {
      const response = await updatePersonalInformation({
        firstName: data.firstName,
        lastName: data.lastName,
        middleName: data.middleName,
        dateOfBirth: data.dateOfBirth,
        age: data.age,
        addresses: addresses,
        emails: emails,
        phones: phones,
        documents: documents,
        occupations: occupations,
      });
      console.log(response.data);
    } catch (err) {
      console.error('Login failed: ', err);
    }
  };

  const handleAddAddress = () => {
    appendAddress({
      country: '',
      city: '',
      street: '',
      postalCode: '',
      type: 0,
    });
  };

  const handleAddEmail = () => {
    appendEmail({
      email: '',
      type: 0,
      preferred: true,
    });
  };

  const handleAddPhone = () => {
    appendPhone({
      phone: '',
      type: 0,
      preferred: true,
    });
  };

  const handleAddDocument = () => {
    appendDocument({
      type: 0,
      expiryDate: '',
    });
  };

  const handleAddOccupation = () => {
    appendOccupation({
      occupation: '',
      fromDate: '',
      toDate: '',
    });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2
        className="text-2xl font-bold text-center"
        style={{ color: 'var(--primary-color)' }}
      >
        Personal Information
      </h2>
      <form
        className="mt-6 space-y-6"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        {/* Basic Information Section */}
        <div className="border panel rounded-md p-4">
          <h3
            className="text-lg font-medium mb-4"
            style={{ color: 'var(--primary-color)' }}
          >
            Basic Information
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="First name"
              placeholder="Enter your first name"
              error={errors.firstName?.message}
              {...register('firstName', { required: 'First name is required' })}
            />
            <Input
              label="Last Name"
              placeholder="Enter your last name"
              error={errors.lastName?.message}
              {...register('lastName', { required: 'Last name is required' })}
            />
            <Input
              label="Middle Name"
              placeholder="Enter your middle name"
              {...register('middleName')}
            />
            <Input
              label="Date of Birth"
              type="date"
              error={errors.dateOfBirth?.message}
              {...register('dateOfBirth', {
                required: 'Date of birth is required',
              })}
            />
            <Input
              label="Age"
              placeholder="Enter your age"
              type="number"
              {...register('age')}
            />
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
            {addressFields.map((field, index) => {
              return (
                <div
                  key={field.id}
                  className={`grid grid-cols-2 gap-4 ${
                    index == addressFields.length - 1 ? '' : 'mb-4'
                  }`}
                >
                  <Input
                    label="Country"
                    placeholder="Enter country"
                    error={errors.addresses?.[index]?.country?.message}
                    {...register(`addresses.${index}.country`, {
                      required: 'Country is required',
                    })}
                  />
                  <Input
                    label="City"
                    placeholder="Enter city"
                    error={errors.addresses?.[index]?.city?.message}
                    {...register(`addresses.${index}.city`, {
                      required: 'City is required',
                    })}
                  />
                  <Input
                    label="Street"
                    placeholder="Enter street"
                    error={errors.addresses?.[index]?.street?.message}
                    {...register(`addresses.${index}.street`, {
                      required: 'Street is required',
                    })}
                  />
                  <Input
                    label="Postal Code"
                    placeholder="Enter postal code"
                    error={errors.addresses?.[index]?.postalCode?.message}
                    {...register(`addresses.${index}.postalCode`)}
                  />
                  <Select
                    label="Type"
                    options={addressTypes}
                    error={errors.addresses?.[index]?.type?.message}
                    {...register(`addresses.${index}.type`)}
                  />
                </div>
              );
            })}
            <Button handleClick={handleAddAddress}>Add Address</Button>
          </div>
          {/* Emails Panel */}
          <div className="panel mb-6">
            <h4 className="text-md font-semibold mb-4">Emails</h4>
            {emailFields.map((field, index) => {
              return (
                <div
                  key={field.id}
                  className={`grid grid-cols-2 gap-4 ${
                    index == emailFields.length - 1 ? '' : 'mb-4'
                  }`}
                >
                  <Input
                    label="Email Address"
                    placeholder="Enter email address"
                    type="email"
                    error={errors.emails?.[index]?.email?.message}
                    {...register(`emails.${index}.email`, {
                      required: 'Email is required',
                    })}
                  />
                  <Select
                    label="Type"
                    options={emailTypes}
                    error={errors.emails?.[index]?.type?.message}
                    {...register(`emails.${index}.type`, {
                      required: 'Email type is required',
                    })}
                  />
                  <Select
                    label="Preferred"
                    options={emailPreferred}
                    error={errors.emails?.[index]?.preferred?.message}
                    {...register(`emails.${index}.preferred`, {
                      required: 'Email preferred is required',
                    })}
                  />
                </div>
              );
            })}
            <Button handleClick={handleAddEmail}>Add Email</Button>
          </div>
          {/* Phones Panel  */}
          <div className="panel mb-6">
            <h4 className="text-md font-semibold mb-4">Phones</h4>
            {phoneFields.map((field, index) => {
              return (
                <div
                  key={field.id}
                  className={`grid grid-cols-2 gap-4 ${
                    index == phoneFields.length - 1 ? '' : 'mb-4'
                  }`}
                >
                  <Input
                    label="Phone Number"
                    placeholder="Enter phone number"
                    type="tel"
                    error={errors.phones?.[index]?.phone?.message}
                    {...register(`phones.${index}.phone`, {
                      required: 'Phone number is required',
                    })}
                  />
                  <Select
                    label="Type"
                    options={phoneTypes}
                    error={errors.phones?.[index]?.type?.message}
                    {...register(`phones.${index}.type`, {
                      required: 'Phone type is required',
                    })}
                  />
                  <Select
                    label="Preferred"
                    options={phonePreferred}
                    error={errors.phones?.[index]?.preferred?.message}
                    {...register(`phones.${index}.preferred`, {
                      required: 'Phone preferred is required',
                    })}
                  />
                </div>
              );
            })}
            <Button handleClick={handleAddPhone}>Add Phone</Button>
          </div>
          <div className="panel mb-6">
            <h4 className="text-md font-semibold mb-4">
              Identification Documents
            </h4>
            {documentFields.map((field, index) => {
              return (
                <div
                  key={field.id}
                  className={`grid grid-cols-3 gap-4 ${
                    index == documentFields.length - 1 ? '' : 'mb-4'
                  }`}
                >
                  <Select
                    label="Type"
                    options={documentTypes}
                    error={errors.documents?.[index]?.type?.message}
                    {...register(`documents.${index}.type`, {
                      required: 'Document type is required',
                    })}
                  />
                  <Input
                    label="Expiry Date"
                    type="date"
                    error={errors.documents?.[index]?.expiryDate?.message}
                    {...register(`documents.${index}.expiryDate`, {
                      required: 'Expiry date is required',
                    })}
                  />
                  <Input label="Uploaded Document" type="file" />
                </div>
              );
            })}
            <Button handleClick={handleAddDocument}>
              Add Identification Document
            </Button>
          </div>
          <div className="panel">
            <h4 className="text-md font-semibold mb-4">Occupations</h4>
            {occupationFields.map((field, index) => {
              return (
                <div
                  key={field.id}
                  className={`grid grid-cols-3 gap-4 ${
                    index == occupationFields.length - 1 ? '' : 'mb-4'
                  }`}
                >
                  <Input
                    label="Occupation"
                    placeholder="Enter occupation"
                    error={errors.occupations?.[index]?.occupation?.message}
                    {...register(`occupations.${index}.occupation`, {
                      required: 'Occupation is required',
                    })}
                  />
                  <Input
                    label="From Date"
                    type="date"
                    error={errors.occupations?.[index]?.fromDate?.message}
                    {...register(`occupations.${index}.fromDate`, {
                      required: 'From date is required',
                    })}
                  />
                  <Input
                    label="To Date"
                    type="date"
                    error={errors.occupations?.[index]?.toDate?.message}
                    {...register(`occupations.${index}.toDate`, {
                      required: 'To date is required',
                    })}
                  />
                </div>
              );
            })}
            <Button handleClick={handleAddOccupation}>Add Occupation</Button>
          </div>
        </div>

        {/* Submit Button */}
        <div className="text-right">
          <Button type="submit" isLoading={isPending} disabled={isPending}>
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
};

export default PersonalInformation;
