// react
import { useState, useCallback } from 'react';
import {
  ActivityIndicator,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  Text,
  View
} from 'react-native';

// custom hooks
import useFetch from "../../hook/useFetch";

// expo router
import { Stack, useRouter, useSearchParams } from 'expo-router';

// assets
import { COLORS, icons, SIZES } from "../../constants";

// components
import {
  Company,
  JobAbout,
  JobFooter,
  JobTabs,
  ScreenHeaderBtn,
  Specifics
} from '../../components';

// new tabs
const tabs = ["About", "Qualifications", "Responsibilities"];

const JobDetails = () => {
  const params = useSearchParams();
  const router = useRouter();

  const { data, isLoading, error, refetch } = useFetch('job-details', {
    job_id: params.id
  });

  const [refreshing, setRefreshing] = useState(false)
  const [activeTab, setActiveTab] = useState(tabs[0]);

  const onRefresh = () => {}

  const displayTabContent = () => {
    switch(activeTab) {
      case 'About':
        return <JobAbout
          info={data[0].job_description ?? 'No data provided'}
        />
      case 'Qualifications':
        return <Specifics
          title='Qualifications'
          points={data[0].job_highlights?.Qualifications ?? ['N/A']}
        />
      case 'Responsibilities':
        return <Specifics
          title='Responsibilities'
          points={data[0].job_highlights?.Responsibilities ?? ['N/A']}
        />
      default:
        break;
    }
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <Stack.Screen options={{
        headerStyle: { backgroundColor: COLORS.lightWhite },
        headerShadowVisible: false,
        headerBackVisible: false, // removing the default router back button
        headerLeft: () => ( // defining an custom router back button
          <ScreenHeaderBtn
            iconUrl={icons.left}
            dimension='60%'
            handlePress={() => router.back()}
          />
        ),
        headerRight: () => ( // defining an custom router back button
          <ScreenHeaderBtn
            iconUrl={icons.share}
            dimension='60%'
          />
        ),
        headerTitle: ''
      }} />

      <>
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {isLoading ? (
            <ActivityIndicator size='large' color={COLORS.primary} />
          ) : error ? (
            <Text>Something went wrong</Text>
          ) : data.length === 0 ? (
            <Text>No data</Text>
          ) : (
            <View style={{ padding: SIZES.medium, paddingBottom: 100 }}>
              <Company
                companyLogo={data[0].employer_logo}
                jobTitle={data[0].job_title}
                companyName={data[0].employer_name}
                location={data[0].job_country}
              />

              <JobTabs
                tabs={tabs}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
              />

              {displayTabContent()}
            </View>
          )}
        </ScrollView>
      </>
    </SafeAreaView>
  )
}

export default JobDetails;