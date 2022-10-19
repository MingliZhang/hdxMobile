import { remove } from 'lodash';

export default async function getDataFromMySQL(screen, params) {
    switch (screen) {
        case 'Results': {
            const sqlQuery =
                params.field == 'name'
                    ? `select s.id, CONCAT_WS(' ',s.fname,s.lname) as name,s.image_url,o.name as organization_name,c.name as country_name 
                      from specialists s 
                      join organization_country oc on s.organization_id = oc.organization_id
                      join organization o on oc.organization_id = o.id
                      join country c on c.id = oc.country_id
                      where MATCH(s.fname,s.lname)
                      AGAINST ('${params.query}')`
                    : `select s.id, CONCAT_WS(' ',s.fname,s.lname) as name,s.image_url,o.name as organization_name,c.name as country_name
                      from specialists s
                      join organization_country oc on s.organization_id = oc.organization_id
                      join organization o on oc.organization_id = o.id
                      join country c on c.id = oc.country_id
                      join specialist_${params.field} on s.id = specialist_${params.field}.specialist_id
                      join ${params.field} on ${params.field}.id = specialist_${params.field}.${params.field}_id
                      where lower(${params.field}.name) like '%${params.query}%'
                      group by s.id
                      order by CONCAT_WS(' ',s.fname,s.lname)`;
            let response = await fetch(
                `https://dx-container-service-1.b49t89157kgn6.us-west-2.cs.amazonlightsail.com/specialist/query-execution?query=${sqlQuery}`
            );
            if (response.ok) {
                return await response.json();
            } else {
                throw 'Server Error.';
            }
        }
        case 'Detail': {
            let result = {},
                response;
            const detailQuery = `select s.id, CONCAT_WS(' ',s.fname,s.lname) as name,s.image_url, s.email,s.phone_no, 
                        o.name as organization,c.name as country,ri.name as research_interest, project.name as project,
                        ha.name as honor_award, expertise.name as experties, education.name as education, department.name as department
                        from specialists s 
                        LEFT join organization_country oc on s.organization_id = oc.organization_id
                        LEFT join organization o on oc.organization_id = o.id
                        LEFT join country c on c.id = oc.country_id
                        LEFT join specialist_research_interest sri on s.id = sri.specialist_id
                        LEFT join research_interest ri on sri.research_interest_id = ri.id
                        LEFT join specialist_project sp on s.id = sp.specialist_id
                        LEFT join project on project.id = sp.project_id
                        LEFT join specialist_honor_award as sha on s.id = sha.specialist_id
                        LEFT join honor_award as ha on ha.id = sha.honor_award_id
                        LEFT join specialist_expertise as sep on s.id = sep.specialist_id
                        LEFT join expertise on sep.expertise_id = expertise.id
                        LEFT join specialist_education sed on s.id = sed.specialist_id
                        LEFT join education on sed.education_id = education.id
                        LEFT join specialist_department as sd on s.id = sd.specialist_id
                        LEFT join department on sd.department_id = department.id
                        where s.id =  ${params.id}`;
            response = await fetch(
                `https://dx-container-service-1.b49t89157kgn6.us-west-2.cs.amazonlightsail.com/specialist/query-execution?query=${detailQuery}`
            );
            if (response.ok) {
                result.details = organizeDetail(await response.json());
            } else {
                throw 'Server Error.';
            }

            const relatedQuery = `CALL get_related_specialist(${params.id});`;
            response = await fetch(
                `https://dx-container-service-1.b49t89157kgn6.us-west-2.cs.amazonlightsail.com/specialist/query-execution?query=${relatedQuery}`
            );
            if (response.ok) {
                result.related = await response.json();
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
    results.education = remove(results.education, (n) => n !== null);
    results.experties = remove(results.experties, (n) => n !== null);
    results.honor_award = remove(results.honor_award, (n) => n !== null);
    results.project = remove(results.project, (n) => n !== null);
    results.research_interest = remove(
        results.research_interest,
        (n) => n !== null
    );
    return results;
}
