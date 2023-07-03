import React, { useEffect, useState } from 'react';
import {
  Text, View, TextInput, StyleSheet,
  TouchableOpacity, Alert, ScrollView, LogBox,
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import DropDownPicker from 'react-native-dropdown-picker';
import WrapperView from './WrapperView';
import { ParamListBase } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useDispatch } from 'react-redux';
import { storeDetails } from '../redux-toolkit/slices/detailsSlice';
// import { storeDetails } from '../redux/actions/detailsActions';

type FormData = {
  firstName: string;
  lastName: string,
  email: string;
  mobile: string;
  password: string;
  confirmPassword: string;
  country: string,
};

type Props = NativeStackScreenProps<ParamListBase>;

export default function FormsPage({ navigation }: Props) {
  const [open, setOpen] = useState(false);
  const [dropdownValue, setDropdownValue] = useState(null);
  const [items, setItems] = useState([
    { label: 'India', value: 'India' },
    { label: 'France', value: 'France' },
  ]);
  const { control, handleSubmit, getValues, reset, formState: { errors } } = useForm<FormData>({
    mode: 'onBlur',
  });

  const dispatch = useDispatch();

  const onSubmit = (data: FormData) => {
    console.log(data);
    // showAlert(data);
    dispatch(storeDetails(data));
    reset();
    navigation.navigate('Details');
  };

  const showAlert = (data: FormData) => {
    Alert.alert(
      'Submitted Successfully!',
      `First Name: ${data.firstName}\nLast Name: ${data.lastName}\nEmail: ${data.email}\nMobile: ${data.mobile}\nCountry: ${data.country}`,
      [
        { text: 'OK' }
      ]
    );
  };

  useEffect(() => {
    LogBox.ignoreLogs(["VirtualizedLists should never be nested"])
  }, [])

  return (
    <WrapperView>
      <View style={styles.container}>
        <ScrollView
          nestedScrollEnabled={true}
          style={styles.padding_24}
        >
          <Text style={styles.headerText}>Please fill out the following details</Text>
          <View>
            <Text style={styles.label}>First Name</Text>
            <Controller
              control={control}
              rules={{
                required: 'First Name is required!',
                minLength: {
                  value: 2,
                  message: 'First Name should be minimum 2 characters long!',
                },
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={styles.input}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  placeholder="Enter your first name"
                />
              )}
              name="firstName"
              defaultValue=""
            />
            {errors.firstName && <Text style={styles.error}>{errors.firstName.message}</Text>}

            <Text style={styles.label}>Last Name</Text>
            <Controller
              control={control}
              rules={{
                required: 'Last Name is required!',
                minLength: {
                  value: 2,
                  message: 'Last Name should be minimum 2 characters long!',
                },
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={styles.input}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  placeholder="Enter your last name"
                />
              )}
              name="lastName"
              defaultValue=""
            />
            {errors.lastName && <Text style={styles.error}>{errors.lastName.message}</Text>}

            <Text style={styles.label}>Email</Text>
            <Controller
              control={control}
              rules={{
                required: 'Email is required!',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address!',
                },
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={styles.input}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  placeholder="Enter your email"
                />
              )}
              name="email"
              defaultValue=""
            />
            {errors.email && <Text style={styles.error}>{errors.email.message}</Text>}

            <Text style={styles.label}>Country</Text>
            <Controller
              control={control}
              rules={{ required: 'Country is required!' }}
              render={({ field: { onChange, value } }) => (
                <DropDownPicker
                  style={styles.input}
                  dropDownContainerStyle={styles.dropdownContainerStyle}
                  placeholderStyle={styles.dropdownPlaceholderStyle}
                  textStyle={styles.padding_8}
                  open={open}
                  value={value}
                  items={items}
                  setOpen={setOpen}
                  setValue={setDropdownValue}
                  setItems={setItems}
                  onSelectItem={(ss) => {
                    console.log(ss);
                    onChange(ss.value || '');
                  }}
                />
              )}
              name="country"
              defaultValue=""
            />
            {errors.country && <Text style={styles.error}>{errors.country.message}</Text>}

            <Text style={styles.label}>Mobile Number</Text>
            <Controller
              control={control}
              rules={{
                required: 'Mobile is required!',
                pattern: {
                  value: /^[0-9]{10}$/,
                  message: 'Invalid mobile number!',
                },
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={styles.input}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  placeholder="Enter your mobile number"
                />
              )}
              name="mobile"
              defaultValue=""
            />
            {errors.mobile && <Text style={styles.error}>{errors.mobile.message}</Text>}

            <Text style={styles.label}>Password</Text>
            <Controller
              control={control}
              rules={{
                required: 'Password is required!',
                minLength: {
                  value: 8,
                  message: 'Password should minimum 8 characters long!',
                },
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={styles.input}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  secureTextEntry
                  placeholder="Enter your password"
                  textContentType={'oneTimeCode'}

                />
              )}
              name="password"
              defaultValue=""
            />
            {errors.password && <Text style={styles.error}>{errors.password.message}</Text>}

            <Text style={styles.label}>Confirm Password</Text>
            <Controller
              control={control}
              rules={{
                required: 'Confirm Password is required!',
                validate: (value) =>
                  value === getValues().password || 'Passwords should match!',
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={styles.input}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  secureTextEntry
                  placeholder="Confirm your password"
                  textContentType={'oneTimeCode'}
                />
              )}
              name="confirmPassword"
              defaultValue=""
            />
            {errors.confirmPassword && <Text style={styles.error}>{errors.confirmPassword.message}</Text>}
          </View>
          <View style={styles.padding_24}></View>
        </ScrollView>
        <View style={styles.submitBtnContainer}>
          <TouchableOpacity onPress={handleSubmit(onSubmit)} style={styles.submitBtn}>
            <Text style={styles.submitBtnText}>SUBMIT</Text>
          </TouchableOpacity>
        </View>
      </View>
    </WrapperView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    marginTop: 16,
    fontWeight: '500',
    color: '#404040',
  },
  input: {
    height: 50,
    borderColor: 'lightgray',
    borderWidth: 1,
    borderRadius: 4,
    padding: 16,
  },
  error: {
    color: 'red',
    marginTop: 8,
  },
  headerText: {
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold',
    paddingHorizontal: 16,
    color: '#2474a8',
    marginBottom: 16,
  },
  submitBtnContainer: {
    paddingHorizontal: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: 'lightgray',
    paddingBottom: 16,
  },
  submitBtn: {
    backgroundColor: '#2474a8',
    height: 50,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  submitBtnText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold'
  },
  dropdownContainerStyle: {
    borderColor: 'lightgray',
  },
  dropdownPlaceholderStyle: {
    padding: 8,
    opacity: 0.5,
    color: 'gray',
  },
  padding_24: {
    padding: 24,
  },
  padding_8: {
    padding: 8
  }
});
