import { FormEvent, useMemo, useState } from "react";

import { Button, Input, PageHeader } from "@/components/ui";
import { validateUrlInfo } from "@/lib/validateUrl";

import { useFetchNewListings } from "../../queries/jobs";
import { useAddUrl, useUrls } from "../../queries/urls";

export function SearchManager() {
  const { data: urls, isLoading, error } = useUrls();
  const { mutate: addUrl } = useAddUrl();
  const { mutate: fetchNewListings } = useFetchNewListings();

  const [urlStr, setUrlStr] = useState("");
  const [name, setName] = useState("");
  const urlDecomp = useMemo(() => validateUrlInfo(urlStr), [urlStr]);

  // TODO: do something with these
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const handleAddUrl = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    if (urlStr && name) {
      addUrl(
        { name, url: urlStr },
        {
          onSuccess: () => {
            setUrlStr("");
            setName("");
            fetchNewListings();
          },
          onError: (receivedError: Error) => {
            console.error("Error adding URL:", receivedError);
          },
        },
      );
    }
  };

  return (
    <>
      <PageHeader>
        <h2>SearchManager</h2>
      </PageHeader>
      <p>Form to add new url</p>
      <form onSubmit={handleAddUrl}>
        {/* <FormItem> */}
        {/* <FormLabel>URL</FormLabel> */}
        {/* <FormControl> */}
        <Input
          name="url"
          type="text"
          placeholder="Enter URL"
          value={urlStr}
          onChange={(e) => setUrlStr(e.target.value)}
        />
        {/* </FormControl> */}
        {/* <FormDescription>Enter the full search URL</FormDescription> */}
        {/* <FormMessage /> */}
        {/* </FormItem> */}

        <input
          name="url"
          type="text"
          placeholder="Enter URL"
          value={urlStr}
          onChange={(e) => setUrlStr(e.target.value)}
        />
        <input
          name="name"
          type="text"
          placeholder="Enter Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Button type="submit" disabled={!urlDecomp.isValid || !name}>
          Add URL
        </Button>
      </form>
      {urlStr && !urlDecomp.isValid && (
        <li style={{ color: "red" }}>Error: {urlDecomp.error}</li>
      )}
      <p>Url Info</p>
      <ul>
        <li>Domain: {urlDecomp.domain}</li>
        <li>Search Term: {urlDecomp.searchTerm}</li>
        <li>Location: {urlDecomp.location}</li>
        <li>Params: {JSON.stringify(urlDecomp.params)}</li>
      </ul>
      <p>List of URLs to manage</p>
      <ul>
        {urls?.map((url) => (
          <li key={url.id}>
            {url.name} - {url.url}
          </li>
        ))}
      </ul>
    </>
  );
}
