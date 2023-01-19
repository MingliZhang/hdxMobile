import {remove} from 'lodash';

export default async function getDataFromMySQL(screen, params) {
  // console.log('screen is ', screen);
  switch (screen) {
    case 'Results': {
      let response = await fetch(
        `https://dx-container-service-1.b49t89157kgn6.us-west-2.cs.amazonlightsail.com/specialist/get-by-filter?search_text=${params.query}&search_filter=${params.field}`,
      );
      if (response.ok) {
        return await response.json();
      } else {
        throw 'Server Error.';
      }
    }
    case 'Detail': {
      let response,
        result = {};
      const relatedQuery = `CALL get_related_specialist(${params.id});`;
      response = await fetch(
        `https://dx-container-service-1.b49t89157kgn6.us-west-2.cs.amazonlightsail.com/specialist/query-execution?query=${relatedQuery}`,
      );
      if (response.ok) {
        result.related = await response.json();
      } else {
        throw 'Server Error.';
      }

      const detailsQuery = `CALL get_specialist_details(${params.id});`;
      response = await fetch(
        `https://dx-container-service-1.b49t89157kgn6.us-west-2.cs.amazonlightsail.com/specialist/query-execution?query=${detailsQuery}`,
      );
      if (response.ok) {
        result.details = await response.json();
      } else {
        throw 'Server Error.';
      }

      return result;
    }
    default:
      console.error('This case does not exists');
      return null;
  }
}

function organizeDetail(data) {
  let results = {
    country: data[0].country,
    department: data[0].department,
    education: [data[0].education],
    email: data[0].email,
    experties: [data[0].experties],
    honor_award: [data[0].honor_award],
    id: data[0].id,
    image_url: data[0].image_url,
    name: data[0].name,
    organization: data[0].organization,
    phone_no: data[0].phone_no,
    project: [data[0].project],
    research_interest: [data[0].research_interest],
  };
  data.shift();
  for (const entry of data) {
    results.education.includes(entry.education)
      ? null
      : results.education.push(entry.education);
    results.experties.includes(entry.experties)
      ? null
      : results.experties.push(entry.experties);
    results.honor_award.includes(entry.honor_award)
      ? null
      : results.honor_award.push(entry.honor_award);
    results.project.includes(entry.project)
      ? null
      : results.project.push(entry.project);
    results.research_interest.includes(entry.research_interest)
      ? null
      : results.research_interest.push(entry.research_interest);
  }
  results.education = remove(results.education, n => n !== null);
  results.experties = remove(results.experties, n => n !== null);
  results.honor_award = remove(results.honor_award, n => n !== null);
  results.project = remove(results.project, n => n !== null);
  results.research_interest = remove(
    results.research_interest,
    n => n !== null,
  );
  return results;
}
